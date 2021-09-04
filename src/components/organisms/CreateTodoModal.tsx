import React, {FC} from 'react';
import Modal from 'react-native-modal';
import styled from '@emotion/native';
import {TouchableWithoutFeedback} from 'react-native';
import Icon from '../atoms/Icon';
import NanumFont from '../atoms/NanumFont';
import NanumInput from '../atoms/NanumInput';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const CreateTodoModal: FC<IProps> = ({visible, setVisible}) => {
  const closeModal = () => setVisible(false);

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={false}
      style={{margin: 0, alignItems: 'center', justifyContent: 'center'}}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <TouchableWithoutFeedback
        style={{flex: 1, backgroundColor: '#0000004c'}}
        onPress={closeModal}>
        <Content>
          <Header>
            <CategoryName>{'Shopping List'}</CategoryName>

            <Square onPress={() => {}}>
              <Icon type={'down'} width={13} />
            </Square>
          </Header>

          <Divider />

          <TitleInput
            numberOfLines={1}
            placeholder={'New To-Do Title'}
            placeholderTextColor={'#c2c2c2'}
          />
        </Content>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTodoModal;

const Content = styled.View`
  position: absolute;
  width: 100%;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  padding: 16px 13px 16px 19px;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CategoryName = styled(NanumFont)`
  font-size: 15px;
  line-height: 29px;
  color: #c2c2c2;
`;

const Divider = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
`;

const Square = styled.TouchableOpacity`
  width: 27px;
  height: 27px;
  background-color: #ededed;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

const TitleInput = styled(NanumInput)`
  margin-top: 12px;
  width: 100%;
  font-size: 20px;
  line-height: 29px;
  color: #102d2d;
`;
