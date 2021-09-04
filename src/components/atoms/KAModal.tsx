import React, {FC} from 'react';
import {Modal, StyleSheet} from 'react-native';
import styled from '@emotion/native';
import {useBackHandler} from '@react-native-community/hooks';

interface IProps {
  visible: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  onPressContent?: () => void;
}

const KAModal: FC<IProps> = ({
  visible,
  onBackdropPress,
  onBackButtonPress,
  onPressContent,
  children,
}) => {
  useBackHandler(() => {
    if (onBackButtonPress) {
      onBackButtonPress();
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      {!!visible && <Background />}

      <Modal
        visible={visible}
        style={styles.modal}
        transparent={true}
        animationType={'slide'}>
        <TWF onPress={onBackdropPress}>
          <KAV behavior={'padding'}>
            <Container>
              <TWF onPress={onPressContent}>{children}</TWF>
            </Container>
          </KAV>
        </TWF>
      </Modal>
    </>
  );
};

export default KAModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Background = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #0000004c;
`;

const TWF = styled.TouchableWithoutFeedback``;

const KAV = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0px 25px;
  align-items: center;
  justify-content: center;
`;
