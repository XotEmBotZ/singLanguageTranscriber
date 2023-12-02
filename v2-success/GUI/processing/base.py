# %%
import cv2
import numpy as np
import time
import mediapipe as mp
from pprint import pprint
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from sklearn.metrics import multilabel_confusion_matrix, accuracy_score
from scipy import stats
import tensorflow as tf

# %%


class signLanguageDetector():

    BaseOptions = mp.tasks.BaseOptions
    VisionRunningMode = mp.tasks.vision.RunningMode
    HandLandmarker = mp.tasks.vision.HandLandmarker
    HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
    PoseLandmarker = mp.tasks.vision.PoseLandmarker
    PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions

    hand_model_path = '/app/processing/models/hand_landmarkr_full.task'
    face_model_path = '/app/processing/models/face_landmarker.task'
    pose_model_path = '/app/processing/models/pose_landmarker_heavy.task'

    startTime = 0

    pastPredict = []
    window = 0

    sentence = ['test']

    def __init__(self, window=5):
        self.startTime = time.time()
        self.model = tf.keras.models.load_model(
            '/app/processing/models/modelv2.keras')
        self.handOptions = self.HandLandmarkerOptions(
            base_options=self.BaseOptions(
                model_asset_path=self.hand_model_path),
            running_mode=self.VisionRunningMode.VIDEO,
            num_hands=2)
        self.poseOptions = self.PoseLandmarkerOptions(
            base_options=self.BaseOptions(
                model_asset_path=self.pose_model_path),
            running_mode=self.VisionRunningMode.VIDEO)

        self.initModels()

        self.colors = [(245, 117, 16), (117, 245, 16), (16, 117, 245)]

        self.sign = ['control', 'yes', 'no', 'thankYou',
                     'hello', 'iLoveYou', 'peace', 'please',]
        self.actions = np.array(self.sign)
        self.label_map = {label: num for num,
                          label in enumerate(self.actions)}.copy()
        self.window = window

    def reset(self):
        self.initModels()
        self.startTime = time.time()
        # self.hand

    def initModels(self):
        self.handLandmarker = self.HandLandmarker.create_from_options(
            self.handOptions)
        self.poseLandmarker = self.PoseLandmarker.create_from_options(
            self.poseOptions)
        return self.handLandmarker, self.poseLandmarker

    def draw_landmarks_on_image(self, rgb_image, pose_detection_result, hand_detection_result):
        pose_landmarks_list = pose_detection_result.pose_landmarks

        hand_landmarks_list = hand_detection_result.hand_landmarks
        handedness_list = hand_detection_result.handedness

        annotated_image = np.copy(rgb_image)

        MARGIN = 10  # pixels
        FONT_SIZE = 1
        FONT_THICKNESS = 1
        HANDEDNESS_TEXT_COLOR = (88, 205, 54)  # vibrant green

        # Loop through the detected poses to visualize.
        for idx in range(len(pose_landmarks_list)):
            pose_landmarks = pose_landmarks_list[idx]

            # Draw the pose landmarks.
            pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
            pose_landmarks_proto.landmark.extend([
                landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in pose_landmarks
            ])
            solutions.drawing_utils.draw_landmarks(
                annotated_image,
                pose_landmarks_proto,
                solutions.pose.POSE_CONNECTIONS,
                solutions.drawing_styles.get_default_pose_landmarks_style())

        # Loop through the detected hands to visualize.
        for idx in range(len(hand_landmarks_list)):
            hand_landmarks = hand_landmarks_list[idx]
            handedness = handedness_list[idx]

            # Draw the hand landmarks.
            hand_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
            hand_landmarks_proto.landmark.extend([
                landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in hand_landmarks
            ])
            solutions.drawing_utils.draw_landmarks(
                annotated_image,
                hand_landmarks_proto,
                solutions.hands.HAND_CONNECTIONS,
                solutions.drawing_styles.get_default_hand_landmarks_style(),
                solutions.drawing_styles.get_default_hand_connections_style())

            # Get the top left corner of the detected hand's bounding box.
            height, width, _ = annotated_image.shape
            x_coordinates = [landmark.x for landmark in hand_landmarks]
            y_coordinates = [landmark.y for landmark in hand_landmarks]
            text_x = int(min(x_coordinates) * width)
            text_y = int(min(y_coordinates) * height) - MARGIN

            # Draw handedness (left or right hand) on the image.
            cv2.putText(annotated_image, f"{handedness[0].category_name}",
                        (text_x, text_y), cv2.FONT_HERSHEY_DUPLEX,
                        FONT_SIZE, HANDEDNESS_TEXT_COLOR, FONT_THICKNESS, cv2.LINE_AA)
        return annotated_image

    def save_data(self, pose_landmarket_result, hand_landmarker_result, name=None, npReturn=False):

        if len(pose_landmarket_result.pose_landmarks) > 0:
            finalPoseData: np.ndarray = np.array([[i.x, i.y, i.z]
                                                  for i in pose_landmarket_result.pose_landmarks[0]]).flatten()
        else:
            finalPoseData = np.zeros((99,))
        finalLeftHandData = np.zeros((63,))
        finalRightHandData = np.zeros((63,))
        for idx in range(len(hand_landmarker_result.hand_landmarks)):

            if hand_landmarker_result.handedness[idx][0].category_name == "Left":
                finalLeftHandData = np.array(
                    [[i.x, i.y, i.z] for i in hand_landmarker_result.hand_landmarks[[idx][0]]]).flatten()
            else:
                finalRightHandData = np.array(
                    [[i.x, i.y, i.z] for i in hand_landmarker_result.hand_landmarks[[idx][0]]]).flatten()

        if npReturn:
            return np.concatenate([finalPoseData, finalLeftHandData, finalRightHandData])
        np.save(name, np.concatenate(
            [finalPoseData, finalLeftHandData, finalRightHandData]))

    def prob_viz(res, actions, input_frame, colors):
        output_frame = input_frame.copy()
        for num, prob in enumerate(res):
            cv2.rectangle(output_frame, (0, 60+num*40),
                          (int(prob*100), 90+num*40), colors[num], -1)
            cv2.putText(output_frame, actions[num], (0, 85+num*40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

        return output_frame

    def calc(self, frame):
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB,
                            data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

        hand_landmarker_result = self.handLandmarker.detect_for_video(
            mp_image, int((time.time()-self.startTime)*1000))
        pose_landmarket_result = self.poseLandmarker.detect_for_video(
            mp_image, int((time.time()-self.startTime)*1000))

        image = cv2.cvtColor(self.draw_landmarks_on_image(
            mp_image.numpy_view(), pose_landmarket_result, hand_landmarker_result), cv2.COLOR_RGB2BGR)

        self.concatArray = self.save_data(pose_landmarket_result,
                                          hand_landmarker_result, npReturn=True)

        predict = self.model.predict(
            np.expand_dims(self.concatArray, axis=0))
        predictF = self.actions[np.argmax(predict)]
        # cv2.putText(image, f"{predictF}", (15, 50),
        #             cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 255), 3)
        cv2.putText(image, f"{predictF}-{(np.max(predict))}", (15, 460),
                    cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 255), 3)

        if len(self.pastPredict) > 50:
            self.pastPredict = self.pastPredict[-self.window:]
        if len(self.sentence) > 5:
            self.sentence = self.sentence[-3:]

        if not predictF == "control":
            self.pastPredict.append(predictF)

        cv2.rectangle(image, (0, 0), (640, 50), (153, 131, 231), -1)

        try:
            predictions = list(set(self.pastPredict[-min(self.window,
                                                    len(self.pastPredict)):]))
            if len(predictions) == 1 and not self.sentence[-1] == predictions[0]:
                self.sentence.append(predictions[0])
            print(self.sentence)

            cv2.putText(image, f"{' '.join(self.sentence)}", (15, 35),
                        cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 255), 3)
        except Exception as e:
            print(e)

        return image
