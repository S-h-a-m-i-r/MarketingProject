import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Button, Typography, Space, Alert } from "antd";

const { Text, Title } = Typography;

const VideoSpeedModal = ({
  visible,
  onClose,
  onApplySpeed,
  videoRef,
  originalDuration = 0,
}) => {
  const [inputMinutes, setInputMinutes] = useState(1); // user enters minutes
  const [isValidInput, setIsValidInput] = useState(true);

  // Reset input when modal opens
  useEffect(() => {
    if (visible) {
      setInputMinutes(1);
      setIsValidInput(true);
    }
  }, [visible]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (value) => {
    setInputMinutes(value);
    // Validate input
    if (value && value > 0 && value <= 60) {
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }
  };

  const handleApply = () => {
    if (!isValidInput || !inputMinutes || inputMinutes <= 0) {
      return;
    }

    let selectedMinutes = inputMinutes;

    // Cap at 15 minutes (900 seconds)
    if (selectedMinutes > 15) {
      selectedMinutes = 15;
    }

    const selectedSeconds = selectedMinutes * 60;

    if (videoRef && videoRef.current && originalDuration > 0) {
      // Calculate playback rate needed to finish video in selectedSeconds
      let playbackRate = originalDuration / selectedSeconds;

      // Clamp playback rate to browser-supported range (typically 0.25x to 4x)
      const minPlaybackRate = 0.1;
      const maxPlaybackRate = 4.0;

      if (playbackRate < minPlaybackRate) {
        playbackRate = minPlaybackRate;
      } else if (playbackRate > maxPlaybackRate) {
        playbackRate = maxPlaybackRate;
      }

      // Apply speed
      videoRef.current.playbackRate = playbackRate;

      // Start playing the video automatically
      videoRef.current.play().catch(() => {
        // This is normal - browsers often block auto-play
      });

      // Callback
      onApplySpeed(playbackRate, selectedSeconds);
    }

    // Close modal
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Video Speed Control"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="apply"
          type="primary"
          onClick={handleApply}
          disabled={!isValidInput || !inputMinutes || inputMinutes <= 0}
          style={{
            opacity:
              !isValidInput || !inputMinutes || inputMinutes <= 0 ? 0.5 : 1,
          }}
        >
          Apply Speed Change
        </Button>,
      ]}
      width={600}
      centered
    >
      <div style={{ padding: "20px 0" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Original Duration Display */}
          <div>
            <Title level={5}>Original Video Duration</Title>
            <Text strong style={{ fontSize: "16px" }}>
              {formatTime(originalDuration)}
            </Text>
          </div>

          {/* Input Section */}
          <div>
            <Title level={5}>Set video to complete in:</Title>
            <div style={{ marginTop: 8 }}>
              <InputNumber
                type="number"
                min={1}
                value={inputMinutes}
                onChange={handleInputChange}
                style={{ width: "100%" }}
                placeholder="Enter minutes (1-60)"
                addonAfter="minutes"
                status={!isValidInput ? "error" : ""}
              />
            </div>
            {!isValidInput && (
              <Alert
                message="Please enter a valid number between 1 and 60 minutes"
                type="error"
                style={{ marginTop: 8 }}
                showIcon
              />
            )}
          </div>

          {/* Preview Section */}
        </Space>
      </div>
    </Modal>
  );
};

export default VideoSpeedModal;
