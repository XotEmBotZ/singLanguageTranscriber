(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[940],{75410:function(){},48628:function(){},31601:function(){},67792:function(){},34977:function(){},75042:function(){},95112:function(t,e,n){Promise.resolve().then(n.bind(n,90082))},90082:function(t,e,n){"use strict";n.r(e);var o=n(57437),i=n(2265),a=n(42180),r=n(95442),s=n.n(r),l=n(14799),u=n(38),c=n(29556),d=n(95416),f=n.n(d),h=n(55029);e.default=()=>{let[t,e]=(0,i.useState)(null),[n,r]=(0,i.useState)(!1),[d,p]=(0,i.useState)({}),[g,m]=(0,i.useState)(""),k=(0,i.useRef)(null),w=(0,i.useRef)(null);var v,y=(0,i.useRef)(null),S=(0,i.useRef)(null);(0,i.useEffect)(()=>{(0,u.Z)(t,e,k),(0,c.M)("VIDEO").then(t=>{let[e,n]=t;y.current=e,S.current=n,console.log(y.current,S.current)}),l.YLj("localstorage://model").then(t=>{console.log("model updated")})},[t]);let _=async()=>{if(y.current&&S.current)try{console.log("In detect");let t=w.current.getContext("2d");t.clearRect(0,0,w.current.width,w.current.height);let e=y.current.detectForVideo(k.current,performance.now()),n=S.current.detectForVideo(k.current,performance.now()),o=new a.ET(t);if(e.landmarks)for(let t of e.landmarks)o.drawLandmarks(t);if(n.landmarks)for(let t of n.landmarks)o.drawLandmarks(t);let[i,r]=(0,c.X)(n,e);if(r){if(225!=i.length){console.warn("ERROR in length");return}console.log(d,g,i.length),d[g].push(i),p(d)}}catch(t){console.warn(t);return}},x=()=>{console.log("In START",!0),r(!0);let t=_();console.log(t,!0);let e=setInterval(_,100);console.log(e),v=e},b=()=>{console.log(d),console.log("In STOP detect",!1),r(!1),h.notifications.show({message:"Data regarding ".concat(g," is captured"),withCloseButton:!0,title:"Data captured",color:"green"}),m(""),console.log(v),clearInterval(v),v=null};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("h1",{onClick:()=>{console.log(d)},className:f().title,children:"Collect data to train your model"}),(0,o.jsx)("p",{children:"Train your own model to recognise your personalized signs. Training your own model will also result in better recognition of your body style."}),(0,o.jsx)("p",{children:"NOTE: - You must record ‘ control’ sign to make the model work.‘control’ sign is just standing still or not showing any sign"}),(0,o.jsx)("p",{children:"After clicking on start capturing, it will stop after 10seconds. If you want to capture more data, click the button again with the same label name"}),(0,o.jsx)("p",{children:"You need to save the data to before proceeding to model train page"}),(0,o.jsxs)("div",{className:f().inputDiv,children:[(0,o.jsx)("input",{type:"text",name:"label",id:"label",value:g,onChange:t=>m(t.target.value),placeholder:"Enter Sing Name"}),(0,o.jsx)("button",{onClick:()=>{if(!g){h.notifications.show({message:"Label cannot be empty",withCloseButton:!0,title:"Error",color:"red"});return}d[g]||(d[g]=[]),console.log(d),x(),setTimeout(b,1e4)},children:n?"Capturing":"Start Capturing"}),(0,o.jsx)("button",{onClick:()=>{localStorage.setItem("trainData",JSON.stringify(d)),console.log("SAVED"),h.notifications.show({message:"Your data is saved",withCloseButton:!0,title:"Data Saved",color:"green"})},children:"Save data"})]}),(0,o.jsxs)("div",{className:f().outputDiv,children:[(0,o.jsxs)("div",{className:s().videoPlayer,children:[(0,o.jsx)("video",{className:"h-full w-full mx-auto",ref:k,autoPlay:!0,muted:!0}),(0,o.jsx)("canvas",{ref:w})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h2",{className:f().capturedTitle,children:"Captured Data Points(s)"}),(0,o.jsx)("div",{children:Object.keys(d).map((t,e)=>(0,o.jsxs)("p",{children:[t,":",d[t].length]},t+e))})]})]})]})}},38:function(t,e,n){"use strict";async function o(t){try{let e=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:!1});t(e)}catch(t){throw alert("Camera is disabled"),t}}async function i(t,e,n){if(t){let e=n.current;if(!e)return;e.srcObject||(e.srcObject=t)}else await o(e);console.log("Working here")}n.d(e,{Z:function(){return i}}),n(2265),n(42180),n(14799)},29556:function(t,e,n){"use strict";n.d(e,{M:function(){return s},X:function(){return l}}),n(2265);var o=n(42180);n(14799),n(38);let i=[];for(let t=0;t<32;t++)i.push(0),i.push(0),i.push(0);let a=i;i=[];for(let t=0;t<21;t++)i.push(0),i.push(0),i.push(0);let r=i,s=async t=>{let e=await o.n.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"),n=await o.uq.createFromOptions(e,{baseOptions:{modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",delegate:"GPU"}});n.setOptions({runningMode:t,numHands:2});let i=await o.qe.createFromOptions(e,{baseOptions:{modelAssetPath:"https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task",delegate:"GPU"}});return i.setOptions({runningMode:t,numPoses:1}),[n,i]},l=(t,e)=>{let n=!1,o=a;if(t.landmarks.length>0){let e=[];for(let n=0;n<33;n++){let o=t.landmarks[0][n];e.push(o.x),e.push(o.y),e.push(o.z)}o=e,n=!0}let i=r,s=r;if(e.handedness.length>0){let t=[],o=[];for(let n=0;n<e.handedness.length;n++){let i=e.handedness[n][0],a=e.landmarks[n];if("Left"===i.categoryName&&0==t.length)for(let e=0;e<21;e++){let n=a[e];t.push(n.x),t.push(n.y),t.push(n.z)}else if("Right"===i.categoryName&&0==o.length)for(let t=0;t<21;t++){let e=a[t];o.push(e.x),o.push(e.y),o.push(e.z)}}t.length&&(i=t),o.length&&(s=o),n=!0}return[[].concat(o,i,s),n]}},95442:function(t){t.exports={videoPlayer:"main_videoPlayer__CokUy"}},95416:function(t){t.exports={title:"train_title__dDPq7",inputDiv:"train_inputDiv__qh0io",outputDiv:"train_outputDiv__CShX8",capturedTitle:"train_capturedTitle___MzWT"}},77499:function(t,e,n){"use strict";function o(){return`mantine-${Math.random().toString(36).slice(2,11)}`}n.d(e,{k:function(){return o}})},55029:function(t,e,n){"use strict";n.r(e),n.d(e,{cleanNotifications:function(){return f},cleanNotificationsQueue:function(){return h},createNotificationsStore:function(){return a},hideNotification:function(){return c},notifications:function(){return p},notificationsStore:function(){return r},showNotification:function(){return u},updateNotification:function(){return d},updateNotificationsState:function(){return l},useNotifications:function(){return s}});var o=n(77499),i=n(2265);let a=()=>(function(t){let e=t,n=!1,o=new Set;return{getState:()=>e,updateState(t){e="function"==typeof t?t(e):t},setState(t){this.updateState(t),o.forEach(t=>t(e))},initialize(t){n||(e=t,n=!0)},subscribe:t=>(o.add(t),()=>o.delete(t))}})({notifications:[],queue:[],limit:5}),r=a(),s=(t=r)=>(0,i.useSyncExternalStore)(t.subscribe,()=>t.getState(),()=>t.getState());function l(t,e){let n=t.getState(),o=e([...n.notifications,...n.queue]);t.setState({notifications:o.slice(0,n.limit),queue:o.slice(n.limit),limit:n.limit})}function u(t,e=r){let n=t.id||(0,o.k)();return l(e,e=>t.id&&e.some(e=>e.id===t.id)?e:[...e,{...t,id:n}]),n}function c(t,e=r){return l(e,e=>e.filter(e=>e.id!==t||(e.onClose?.(e),!1))),t}function d(t,e=r){return l(e,e=>e.map(e=>e.id===t.id?{...e,...t}:e)),t.id}function f(t=r){l(t,()=>[])}function h(t=r){l(t,e=>e.slice(0,t.getState().limit))}let p={show:u,hide:c,update:d,clean:f,cleanQueue:h,updateState:l}}},function(t){t.O(0,[566,425,938,636,663,498,399,443,180,971,472,744],function(){return t(t.s=95112)}),_N_E=t.O()}]);