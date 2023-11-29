# %%
import cv2
import numpy as np
import os
from matplotlib import pyplot as plt
import time
import mediapipe as mp
from pprint import pprint
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2

# %%
BaseOptions = mp.tasks.BaseOptions
VisionRunningMode = mp.tasks.vision.RunningMode

HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions

FaceLandmarker = mp.tasks.vision.FaceLandmarker
FaceLandmarkerOptions = mp.tasks.vision.FaceLandmarkerOptions


PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions

# %%
hand_model_path = 'models/hand_landmarkr_full.task'
face_model_path = 'models/face_landmarker.task'
pose_model_path = 'models/pose_landmarker_heavy.task'

# %%
handOptions = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=hand_model_path),
    running_mode=VisionRunningMode.IMAGE,
    num_hands=2)

faceOptions = FaceLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=face_model_path),
    running_mode=VisionRunningMode.IMAGE)

poseOptions = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=pose_model_path),
    running_mode=VisionRunningMode.IMAGE)

# %%
handLandmarker = HandLandmarker.create_from_options(handOptions)
faceLandmarker = FaceLandmarker.create_from_options(faceOptions)
poseLandmarker = PoseLandmarker.create_from_options(poseOptions)

# %%


def draw_landmarks_on_image(rgb_image, pose_detection_result, hand_detection_result, face_detection_results):
    pose_landmarks_list = pose_detection_result.pose_landmarks

    hand_landmarks_list = hand_detection_result.hand_landmarks
    handedness_list = hand_detection_result.handedness

    face_landmarks_list = face_detection_results.face_landmarks

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

    # Loop through the detected faces to visualize.
    for idx in range(len(face_landmarks_list)):
        face_landmarks = face_landmarks_list[idx]

        # Draw the face landmarks.
        face_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        face_landmarks_proto.landmark.extend([
            landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in face_landmarks
        ])

        solutions.drawing_utils.draw_landmarks(
            image=annotated_image,
            landmark_list=face_landmarks_proto,
            connections=mp.solutions.face_mesh.FACEMESH_TESSELATION,
            landmark_drawing_spec=None,
            connection_drawing_spec=mp.solutions.drawing_styles
            .get_default_face_mesh_tesselation_style())
        solutions.drawing_utils.draw_landmarks(
            image=annotated_image,
            landmark_list=face_landmarks_proto,
            connections=mp.solutions.face_mesh.FACEMESH_CONTOURS,
            landmark_drawing_spec=None,
            connection_drawing_spec=mp.solutions.drawing_styles
            .get_default_face_mesh_contours_style())
        solutions.drawing_utils.draw_landmarks(
            image=annotated_image,
            landmark_list=face_landmarks_proto,
            connections=mp.solutions.face_mesh.FACEMESH_IRISES,
            landmark_drawing_spec=None,
            connection_drawing_spec=mp.solutions.drawing_styles
            .get_default_face_mesh_iris_connections_style())
    return annotated_image

# %%


def save_data(name, pose_landmarket_result, hand_landmarker_result, face_landmarket_result):
    if len(face_landmarket_result.face_landmarks) > 0:
        finalFaceData: np.ndarray = np.array([[i.x, i.y, i.z]
                                              for i in face_landmarket_result.face_landmarks[0]]).flatten()
    else:
        finalFaceData = np.zeros((1434,))

    if len(pose_landmarket_result.pose_landmarks) > 0:
        finalPoseData: np.ndarray = np.array([[i.x, i.y, i.z]
                                              for i in pose_landmarket_result.pose_landmarks[0]]).flatten()
    else:
        finalPoseData = np.zeros((99,))

    if len(hand_landmarker_result.handedness) > 0 and not len([i[0].index for i in hand_landmarker_result.handedness if i[0].category_name == "Left"]) == 0:
        finalLeftHandData: np.ndarray = np.array([[i.x, i.y, i.z] for i in hand_landmarker_result.hand_landmarks[[
                                                 i[0].index for i in hand_landmarker_result.handedness if i[0].category_name == "Left"][0]]]).flatten()
    else:
        finalLeftHandData = np.zeros((63,))

    if len(hand_landmarker_result.handedness) > 0 and not len([i[0].index for i in hand_landmarker_result.handedness if i[0].category_name == "Right"]) == 0:
        finalRightHandData: np.ndarray = np.array([[i.x, i.y, i.z] for i in hand_landmarker_result.hand_landmarks[[
                                                  i[0].index for i in hand_landmarker_result.handedness if i[0].category_name == "Right"][0]]]).flatten()
    else:
        finalRightHandData = np.zeros((63,))
    np.save(name, np.concatenate(
        [finalFaceData, finalPoseData, finalLeftHandData, finalRightHandData]))


# %%
try:
    cap = cv2.VideoCapture(0)
    prev_frame_time = 0
    new_frame_time = 0
    startTime = time.time()
    while cap.isOpened():
        new_frame_time = time.time()

        ret, frame = cap.read()

        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB,
                            data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

        hand_landmarker_result = handLandmarker.detect(
            mp_image,)
        face_landmarket_result = faceLandmarker.detect(
            mp_image,)
        pose_landmarket_result = poseLandmarker.detect(
            mp_image,)

        image = cv2.cvtColor(draw_landmarks_on_image(
            mp_image.numpy_view(), pose_landmarket_result, hand_landmarker_result, face_landmarket_result), cv2.COLOR_RGB2BGR)

        save_data("testSave.npy", pose_landmarket_result,
                  hand_landmarker_result, face_landmarket_result)

        fps = 1/(new_frame_time-prev_frame_time)
        prev_frame_time = new_frame_time
        cv2.putText(image, f"{fps:1f}", (15, 50),
                    cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 255), 3)
        cv2.imshow('OpenCV Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
except:
    cap.release()

# %%
cv2.destroyAllWindows()
