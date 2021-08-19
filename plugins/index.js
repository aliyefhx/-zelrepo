```javascript
// @noflow
// eslint-disable-next-line no-constant-condition
if (process.arch === 'ia32' && process.platform === 'win32') {
  // skip wavoip on 32 bit windows
  module.exports = {
    init: null,
    updateAudioVideoSwitch: null,
    updateNetworkMedium: null,
    cleanup: null,
  };
} else {
  const binding = require('bindings')('binding.node');

  module.exports = {
    init: binding.init,
    updateAudioVideoSwitch: binding.updateAudioVideoSwitch,
    getCallInfo: binding.getCallInfo,
    setLogPath: binding.setLogPath,
    cleanup: binding.cleanup,
    refresh: binding.refresh,
    registerEventCallback: binding.registerEventCallback,
    registerSignalingXmppCallback: binding.registerSignalingXmppCallback,
    registerCryptoCallbacks: binding.registerCryptoCallbacks,
    registerLoggingCallback: binding.registerLoggingCallback,
    handleIncomingSignalingOffer: binding.handleIncomingSignalingOffer,
    handleIncomingSignalingMsg: binding.handleIncomingSignalingMsg,
    handleIncomingSignalingReceipt: binding.handleIncomingSignalingReceipt,
    handleIncomingSignalingAck: binding.handleIncomingSignalingAck,
    start: binding.start,
    startMD: binding.startMD,
    startGroupCallMD: binding.startGroupCallMD,
    inviteToGroupCallMD: binding.inviteToGroupCallMD,
    resendOfferOnDecryptionFailureMD: binding.resendOfferOnDecryptionFailureMD,
    end: binding.end,
    acceptCall: binding.acceptCall,
    rejectCall: binding.rejectCall,
    rejectCallWithoutCallCtx: binding.rejectCallWithoutCallCtx,
    resendEncRekeyRetry: binding.resendEncRekeyRetry,
    mute: binding.mute,
    videoTurnCameraOn: binding.videoTurnCameraOn,
    videoTurnCameraOff: binding.videoTurnCameraOff,
    videoStreamPause: binding.videoStreamPause,
    videoStreamResume: binding.videoStreamResume,
    videoRequestUpgrade: binding.videoRequestUpgrade,
    videoAcceptUpgrade: binding.videoAcceptUpgrade,
    videoRejectUpgrade: binding.videoRejectUpgrade,
    videoCancelUpgrade: binding.videoCancelUpgrade,
    setScreenSize: binding.setScreenSize,
    notifyDeviceIdentityChangedOrDeletedMD:
      binding.notifyDeviceIdentityChangedOrDeletedMD,
    getNumParticipantsFromCallOffer: binding.getNumParticipantsFromCallOffer,
    eventToStr: binding.eventToStr,
    registerVideoPreviewBuffer: binding.registerVideoPreviewBuffer,
    registerVideoBuffer: binding.registerVideoBuffer,
    cleanupVideoBuffer: binding.cleanupVideoBuffer,
    registerSelfAudioBuffer: binding.registerSelfAudioBuffer,
    cleanupAudioBuffer: binding.cleanupAudioBuffer,
    updateNetworkMedium: binding.updateNetworkMedium,
    debugGetStatisticString: binding.debugGetStatisticString,
    getAVDevices: binding.getAVDevices,
    registerAVDeviceChangedCallback: binding.registerAVDeviceChangedCallback,
    registerAVDeviceStatusChangedCallback:
      binding.registerAVDeviceStatusChangedCallback,
    selectDevice: binding.selectDevice,
    selectCamera: binding.selectCamera,
    selectAudio: binding.selectAudio,
  };
}
```