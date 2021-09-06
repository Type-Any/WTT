import React, {FC} from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import NanumFont from '../atoms/NanumFont';
import NanumInput from '../atoms/NanumInput';
import KAModal from '../atoms/KAModal';
import {useRef} from 'react';
import {TextInput} from 'react-native';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const CreateTodoModal: FC<IProps> = ({visible, setVisible}) => {
  const titleRef = useRef<TextInput | null>(null);
  const descRef = useRef<TextInput | null>(null);

  const blurInput = () => {
    titleRef?.current?.blur?.();
    descRef?.current?.blur?.();
  };

  const closeModal = () => setVisible(false);

  return (
    <KAModal
      visible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      onPressContent={blurInput}>
      <Content>
        <Header>
          <CategoryName>{'Shopping List'}</CategoryName>

          <Square onPress={() => {}}>
            <Icon type={'down'} width={13} />
          </Square>
        </Header>

        <Divider />

        <TitleInput
          ref={titleRef}
          numberOfLines={1}
          placeholder={'New To-Do Title'}
          placeholderTextColor={'#c2c2c2'}
        />

        <DescInput
          ref={descRef}
          placeholder={'Description'}
          placeholderTextColor={'#c2c2c2'}
          multiline={true}
          textAlignVertical={'top'}
        />

        <Footer>
          <CalendarButton>
            <Icon type={'someday-gray'} />

            <CalendarTitle>{'Set to D-day'}</CalendarTitle>
          </CalendarButton>

          <Icon
            type={'checked-circle'}
            width={40}
            height={40}
            onPress={() => {}}
          />
        </Footer>
      </Content>
    </KAModal>
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

const DescInput = styled(NanumInput)`
  margin-top: 3px;
  width: 100%;
  flex: 1;
  font-size: 14px;
  line-height: 29px;
  color: #102d2d;
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CalendarButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CalendarTitle = styled(NanumFont)`
  margin-left: 6px;
  font-size: 14px;
  line-height: 29px;
  color: #c2c2c2;
`;
