"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[498],{90374:function(e,t,a){a.d(t,{QC:function(){return L}}),a(33714);var r=a(90933),s=a(5496),i=a(93466),n=a(32444),o=a(8528),l=a(94424),h=a(11763),u=a(38048),d=a(20384),p=a(12424),g=a(42508),m=a(53087),c=a(57815),f=a(37372),I=a(16003),x=a(8546),E=a(8986),D=a(37577),T=a(17451);/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let B=r.GDt.ZA,y={},P=(0,r.OBj)().getNumber("CPU_HANDOFF_SIZE_THRESHOLD");class L extends r.Zuw{nextDataId(){return L.nextDataId++}constructor(e){let t;if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!(0,r.OBj)().getBool("HAS_WEBGL"))throw Error("WebGL is not supported on this device");if(null!=e){if(e instanceof d.A)t=e;else{let a=(0,s.jl)((0,r.OBj)().getNumber("WEBGL_VERSION"),e);t=new d.A(a)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{var a;let e=(0,s.jl)((0,r.OBj)().getNumber("WEBGL_VERSION"));t=new d.A(e),this.binaryCache=((a=(0,r.OBj)().getNumber("WEBGL_VERSION"))in y||(y[a]={}),y[a]),this.gpgpuCreatedLocally=!0}this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new I.I(this.gpgpu),this.numMBBeforeWarning=null==(0,r.OBj)().global.screen?1024:(0,r.OBj)().global.screen.height*(0,r.OBj)().global.screen.width*window.devicePixelRatio*600/1024/1024,this.texData=new r.JLz(this,(0,r.SRH)())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,a,r,s,i){let n=this.makeTensorInfo(t,a),o=this.texData.get(n.dataId);o.isPacked=!1,o.texture={texture:e,texShape:[r,s]},o.texShape=[r,s];let l=T.ih(t),u=new h.F(l,!1,i),d=this.runWebGLProgram(u,[n],a,[[r,s]]);return d.shape=t,o.texture=null,this.disposeIntermediateTensorInfo(n),d.dataId}write(e,t,a){if(((0,r.OBj)().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||(0,r.OBj)().getBool("DEBUG"))&&this.checkNumericalProblems(e),"complex64"===a&&null!=e)throw Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let s={id:this.nextDataId()};return this.texData.set(s,{shape:t,dtype:a,values:e,usage:f.v2.UPLOAD,refCount:1}),s}refCount(e){if(this.texData.has(e)){let t=this.texData.get(e);return t.refCount}return 0}incRef(e){let t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){let t=this.texData.get(e);t.refCount--}}move(e,t,a,s,i){if((0,r.OBj)().getBool("DEBUG")&&this.checkNumericalProblems(t),"complex64"===s)throw Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:a,dtype:s,values:t,usage:f.v2.UPLOAD,refCount:i})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){let t,a;let s=this.texData.get(e),{values:i,dtype:n,complexTensorInfos:o,slice:l,shape:h,isPacked:u}=s;if(null!=l){let t;t=u?new E.cc(h,x.bl):new x.l(h,x.bl);let a=this.runWebGLProgram(t,[{dataId:e,shape:h,dtype:n}],n),r=this.readSync(a.dataId);return this.disposeIntermediateTensorInfo(a),r}if(null!=i)return this.convertAndCacheOnCPU(e);if("string"===n)return i;let d=null!=this.activeTimers;if(d&&(t=r.D5U.now()),"complex64"===n){let e=this.readSync(o.real.dataId),t=this.readSync(o.imag.dataId);a=r.backend_util.mergeRealAndImagArrays(e,t)}else a=this.getValuesFromTexture(e);return d&&(this.downloadWaitMs+=r.D5U.now()-t),this.convertAndCacheOnCPU(e,a)}async read(e){let t,a;if(this.pendingRead.has(e)){let t=this.pendingRead.get(e);return new Promise(e=>t.push(e))}let s=this.texData.get(e),{values:i,shape:n,slice:o,dtype:l,complexTensorInfos:h,isPacked:u}=s;if(null!=o){let t;t=u?new E.cc(n,x.bl):new x.l(n,x.bl);let a=this.runWebGLProgram(t,[{dataId:e,shape:n,dtype:l}],l),r=this.read(a.dataId);return this.disposeIntermediateTensorInfo(a),r}if(null!=i)return this.convertAndCacheOnCPU(e);if((0,r.OBj)().getBool("DEBUG")&&!(0,r.OBj)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&2===(0,r.OBj)().getNumber("WEBGL_VERSION"))throw Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let d=null;if("complex64"!==l&&(0,r.OBj)().get("WEBGL_BUFFER_SUPPORTED")){t=this.decode(e);let a=this.texData.get(t.dataId);d=this.gpgpu.createBufferFromTexture(a.texture.texture,...f.Yz(n))}if(this.pendingRead.set(e,[]),"complex64"!==l&&await this.gpgpu.createAndWaitForFence(),"complex64"===l){let e=await Promise.all([this.read(h.real.dataId),this.read(h.imag.dataId)]),t=e[0],s=e[1];a=r.backend_util.mergeRealAndImagArrays(t,s)}else if(null==d)a=this.getValuesFromTexture(e);else{let e=r.D5U.sizeFromShape(n);a=this.gpgpu.downloadFloat32MatrixFromBuffer(d,e)}if(null!=t&&this.disposeIntermediateTensorInfo(t),null!=d){let e=this.gpgpu.gl;T.O7(e,()=>e.deleteBuffer(d))}let p=this.convertAndCacheOnCPU(e,a),g=this.pendingRead.get(e);return this.pendingRead.delete(e),g.forEach(e=>e(p)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&(0,r.SRH)().removeDataId(e,this),this.pendingDeletes--),p}readToGPU(e,t={}){let a=this.texData.get(e),{values:s,shape:i,slice:n,dtype:o,isPacked:l,texture:h}=a;if("complex64"===o)throw Error("Does not support reading texture for complex64 dtype.");if(null!=n){let a;a=l?new E.cc(i,x.bl):new x.l(i,x.bl);let r=this.runWebGLProgram(a,[{dataId:e,shape:i,dtype:o}],o),s=this.readToGPU(r,t);return this.disposeIntermediateTensorInfo(r),s}if(null==h){if(null!=s)throw Error("Data is not on GPU but on CPU.");throw Error("There is no data on GPU or CPU.")}let u=this.decode(e,t.customTexShape),d=(0,r.SRH)().makeTensorFromTensorInfo(u),p=this.texData.get(u.dataId);return Object.assign({tensorRef:d},p.texture)}bufferSync(e){let t=this.readSync(e.dataId);if("string"===e.dtype)try{let a=t.map(e=>r.D5U.decodeString(e));return(0,r.f3b)(e.shape,e.dtype,a)}catch(e){throw Error("Failed to decode encoded string bytes into utf-8")}return(0,r.f3b)(e.shape,e.dtype,t)}checkNumericalProblems(e){if(null!=e)for(let t=0;t<e.length;t++){let a=e[t];if(!T.qF(a)){if((0,r.OBj)().getBool("WEBGL_RENDER_FLOAT32_CAPABLE"))throw Error(`The value ${a} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`);throw Error(`The value ${a} cannot be represented on this device.`)}}}getValuesFromTexture(e){let{shape:t,dtype:a,isPacked:s}=this.texData.get(e),i=r.D5U.sizeFromShape(t);if((0,r.OBj)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let a=this.decode(e),r=this.texData.get(a.dataId),s=this.gpgpu.downloadMatrixFromPackedTexture(r.texture.texture,...f.Yz(t)).subarray(0,i);return this.disposeIntermediateTensorInfo(a),s}let n=(0,r.OBj)().getBool("WEBGL_PACK")&&!0===s,h=n?T.ih(t):t,u=n?new l.d(h):new o.q(h),d=this.runWebGLProgram(u,[{shape:h,dtype:a,dataId:e}],"float32"),p=this.texData.get(d.dataId),g=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(p.texture.texture,p.texShape[0],p.texShape[1]).subarray(0,i);return this.disposeIntermediateTensorInfo(d),g}timerAvailable(){return(0,r.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(e){let t=this.activeTimers,a=[],s=!1;null==this.programTimersStack?(this.programTimersStack=a,s=!0):this.activeTimers.push(a),this.activeTimers=a,e();let i=r.D5U.flatten(this.activeTimers.map(e=>e.query)).filter(e=>null!=e),n=r.D5U.flatten(this.activeTimers.map(e=>e.name)).filter(e=>null!=e);this.activeTimers=t,s&&(this.programTimersStack=null);let o={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if((0,r.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let e=await Promise.all(i);o.kernelMs=r.D5U.sum(e),o.getExtraProfileInfo=()=>e.map((e,t)=>({name:n[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(", ")}else o.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,o})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return(0,r.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:r.D5U.now(),endMs:null}}endTimer(e){return(0,r.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.endQuery():e.endMs=r.D5U.now(),e}async getQueryTime(e){return(0,r.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.waitForQueryAndGetTime(e):e.endMs-e.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);let{complexTensorInfos:a}=this.texData.get(e);return null!=a&&(this.disposeData(a.real.dataId,t),this.disposeData(a.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){let{texture:t,dtype:a,texShape:r,usage:s,isPacked:i,slice:n}=this.texData.get(e),o=n&&n.origDataId||e,l=this.dataRefCount.get(o);l>1?this.dataRefCount.set(o,l-1):(this.dataRefCount.delete(o),null!=t&&(this.numBytesInGPU-=this.computeBytes(r,a),this.textureManager.releaseTexture(t,r,s,i)));let h=this.texData.get(e);h.texture=null,h.texShape=null,h.isPacked=!1,h.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=P){return(0,r.OBj)().getBool("WEBGL_CPU_FORWARD")&&e.every(e=>null==this.texData.get(e.dataId).texture&&r.D5U.sizeFromShape(e.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){r.backend_util.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let t=e.dataSync();return B(e.shape,t)}packedUnaryOp(e,t,a){let s=new E.cc(e.shape,t),i=this.compileAndRun(s,[e],a);return(0,r.SRH)().makeTensorFromTensorInfo(i)}abs(e){if(this.shouldExecuteOnCPU([e])&&"complex64"!==e.dtype){let t=(0,g.CJ)(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,t)}if((0,r.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,x.Et,e.dtype);let t=new x.l(e.shape,x.Et),a=this.compileAndRun(t,[e]);return(0,r.SRH)().makeTensorFromTensorInfo(a)}makeTensorInfo(e,t,a){let s;if("string"===t&&null!=a&&a.length>0&&r.D5U.isString(a[0])){let i=a.map(e=>r.D5U.encodeString(e));s=this.write(i,e,t)}else s=this.write(a,e,t);return this.texData.get(s).usage=null,{dataId:s,shape:e,dtype:t}}makeOutput(e,t,a){return(0,r.SRH)().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,a),this)}unpackTensor(e){let t=new D.W(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){let t=new m.U(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){let a=[T.Cp(e.shape),...T.W8(e.shape)],r={dtype:e.dtype,shape:a,dataId:e.dataId},s=[T.Cp(t),...T.W8(t)],i=new c.v(s,a),n=this.runWebGLProgram(i,[r],e.dtype,[a],!0);return{dataId:n.dataId,shape:t,dtype:n.dtype}}decode(e,t){let a;let s=this.texData.get(e),{isPacked:o,shape:l,dtype:h}=s;if(null!=t){let e=r.D5U.sizeFromShape(l),a=t[0]*t[1]*4;r.D5U.assert(e<=a,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let u=T.ih(l);a=o?new n.G(u):new i._(u);let d=[null!=t?t:f.Yz(u)],p=this.runWebGLProgram(a,[{shape:u,dtype:h,dataId:e}],h,d,!0,t);return{dtype:h,shape:l,dataId:p.dataId}}runWebGLProgram(e,t,a,s,i=!1,n){let o;let l=this.makeTensorInfo(e.outputShape,a),h=this.texData.get(l.dataId);if(e.packedOutput&&(h.isPacked=!0),e.outPackingScheme===f.m1.DENSE){let t=null!=n?n:f.Yz(e.outputShape);h.texShape=t.map(e=>2*e)}if(null!=e.outTexUsage&&(h.usage=e.outTexUsage),0===r.D5U.sizeFromShape(l.shape))return h.values=r.D5U.getTypedArrayFromDType(l.dtype,0),l;let u=[],d=t.map(t=>{if("complex64"===t.dtype)throw Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let a=this.texData.get(t.dataId);if(null==a.texture){if(!e.packedInputs&&r.D5U.sizeFromShape(t.shape)<=(0,r.OBj)().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:t.shape,texData:null,isUniform:!0,uniformValues:a.values};e.packedInputs&&(a.isPacked=!0,a.shape=t.shape)}if(this.uploadToGPU(t.dataId),!!a.isPacked!=!!e.packedInputs)t=a.isPacked?this.unpackTensor(t):this.packTensor(t),u.push(t),a=this.texData.get(t.dataId);else if(a.isPacked&&!T.oT(a.shape,t.shape)){let e=t,r=t.shape;t.shape=a.shape,t=this.packedReshape(t,r),u.push(t),a=this.texData.get(t.dataId),e.shape=r}return{shape:t.shape,texData:a,isUniform:!1}});this.uploadToGPU(l.dataId);let g={shape:l.shape,texData:h,isUniform:!1},m=p.mi(e,d,g),c=this.getAndSaveBinary(m,()=>p.IJ(this.gpgpu,e,d,g)),I=null!=this.activeTimers;I&&(o=this.startTimer()),(0,r.OBj)().get("ENGINE_COMPILE_ONLY")||p._s(this.gpgpu,c,d,g,s),u.forEach(e=>this.disposeIntermediateTensorInfo(e)),I&&(o=this.endTimer(o),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(o)}));let x=(0,r.OBj)().getNumber("WEBGL_FLUSH_THRESHOLD");if(x>0){let e=r.D5U.now();e-this.lastGlFlushTime>x&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=e)}if(!(0,r.OBj)().getBool("WEBGL_LAZILY_UNPACK")&&h.isPacked&&!1===i){let e=this.unpackTensor(l);return this.disposeIntermediateTensorInfo(l),e}return l}compileAndRun(e,t,a,r,s=!1){a=a||t[0].dtype;let i=this.runWebGLProgram(e,t,a,r,s);return i}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){if(!this.disposed){if(!(0,r.OBj)().getBool("IS_TEST")){let e=Object.keys(this.binaryCache);e.forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]})}this.textureManager.dispose(),null!=this.canvas&&"undefined"!=typeof HTMLCanvasElement&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0}}floatPrecision(){return null==this.floatPrecisionValue&&(this.floatPrecisionValue=(0,r.lub)(()=>{if(!(0,r.OBj)().get("WEBGL_RENDER_FLOAT32_ENABLED")){let e=(0,r.OBj)().getBool("DEBUG");(0,r.OBj)().set("DEBUG",!1);let t=this.abs((0,r.iD$)(1e-8)).dataSync()[0];if((0,r.OBj)().set("DEBUG",e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}uploadToGPU(e){let t;let a=this.texData.get(e),{shape:s,dtype:i,values:n,texture:o,usage:l,isPacked:d}=a;if(null!=o)return;let p=null!=this.activeTimers;p&&(t=r.D5U.now());let g=a.texShape;if(null==g&&(g=T.Yf(s,d),a.texShape=g),null!=n){let e;let o=T.ih(s),l=g[1],m=g[0],c=n instanceof Uint8Array||n instanceof Uint8ClampedArray;(d||!c)&&([l,m]=f.qe(g[0],g[1])),e=d?new u.Z(o,c):new h.F(o,c);let I=c?[m,l]:g,x=this.makeTensorInfo(I,i),E=this.texData.get(x.dataId);c?E.usage=f.v2.PIXELS:E.usage=f.v2.UPLOAD,E.texShape=I,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(x.dataId),l,m,n);let D=[[m,l]],B=this.runWebGLProgram(e,[x],i,D,!0),y=this.texData.get(B.dataId);a.texShape=y.texShape,a.isPacked=y.isPacked,a.usage=y.usage,(0,r.OBj)().get("ENGINE_COMPILE_ONLY")?this.disposeData(B.dataId):(a.texture=y.texture,a.values=null,this.texData.delete(B.dataId)),this.disposeIntermediateTensorInfo(x),p&&(this.uploadWaitMs+=r.D5U.now()-t)}else{let e=this.acquireTexture(g,l,i,d);a.texture=e}}convertAndCacheOnCPU(e,t){let a=this.texData.get(e),{dtype:r}=a;return null!=t&&(a.values=function(e,t){if("float32"===t||"complex64"===t)return e;if("int32"===t||"bool"===t){let a="int32"===t?new Int32Array(e.length):new Uint8Array(e.length);for(let t=0;t<a.length;++t)a[t]=Math.round(e[t]);return a}throw Error(`Unknown dtype ${t}`)}(t,r)),a.values}acquireTexture(e,t,a,r){if(this.numBytesInGPU+=this.computeBytes(e,a),!this.warnedAboutMemory&&this.numBytesInGPU>1048576*this.numMBBeforeWarning){let e=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${e} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,r)}computeBytes(e,t){return e[0]*e[1]*r.D5U.bytesPerElement(t)}checkCompileCompletion(){for(let[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}async checkCompileCompletionAsync(){let e=[];if(this.gpgpu.parallelCompilationExtension){for(let[,t]of Object.entries(this.binaryCache))e.push(this.checkCompletionAsync_(t));return Promise.all(e)}for(let[,t]of Object.entries(this.binaryCache)){let a=new Promise(e=>{try{this.checkCompletion_(t),e(!0)}catch(e){throw e}});e.push(a)}return Promise.all(e)}async checkCompletionAsync_(e){return this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(e):(await (0,r.glt)(),this.checkCompletionAsync_(e))}checkCompletion_(e){if(!1===this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)){if(console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),!1===this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS))throw T.w4(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),Error("Failed to compile fragment shader.");throw Error("Failed to link vertex and fragment shaders.")}return!0}getUniformLocations(){for(let e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);let{variablesLocations:t,customUniformLocations:a,infLoc:r,nanLoc:s,outShapeLocation:i,outShapeStridesLocation:n,outTexShapeLocation:o}=(0,p.Yv)(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=a,e.infLoc=r,e.nanLoc=s,e.outShapeLocation=i,e.outShapeStridesLocation=n,e.outTexShapeLocation=o}}createTensorFromGPUData(e,t,a){e.channels=e.channels||"RGBA";let{texture:s,height:i,width:n,channels:o}=e,l=(0,r.SRH)().backend;if(!l.gpgpu.gl.isTexture(s))throw Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");let h=l.writeTexture(s,t,a,i,n,o);return(0,r.SRH)().makeTensorFromDataId(h,t,a,l)}}L.nextDataId=0}}]);