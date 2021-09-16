import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import KAModal from '../atoms/KAModal';
import {useRef} from 'react';
import {TextInput} from 'react-native';
import {useMutation} from '../../utils/hooks/useMutation';
import {request} from '../../utils/fetcher';
import {useCategories} from '../../swr/categories';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const CreateCategoryModal: FC<IProps> = ({visible, setVisible}) => {
  const {mutate} = useCategories();
  const [postCategoryApi] = useMutation<{name: string}, boolean>(
    request.post,
    mutate,
  );

  const titleRef = useRef<TextInput | null>(null);
  const [name, setName] = useState('');

  const blur = () => titleRef?.current?.blur?.();
  const closeModal = () => setVisible(false);

  const onSubmit = () => {
    if (!name) return;
    closeModal?.();
    postCategoryApi('/categories', {name});
  };

  useEffect(() => {
    !!visible && titleRef?.current?.focus?.();
  }, [visible]);

  return (
    <KAModal
      visible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      onPressContent={blur}>
      <Content>
        <TitleInput
          ref={titleRef}
          numberOfLines={1}
          placeholder={'New Category Name'}
          placeholderTextColor={'#c2c2c2'}
          value={name}
          onChangeText={setName}
          onSubmitEditing={onSubmit}
        />

        <Divider />

        <Footer>
          <Icon
            type={'checked-circle'}
            width={40}
            height={40}
            onPress={onSubmit}
          />
        </Footer>
      </Content>
    </KAModal>
  );
};

export default CreateCategoryModal;

const Content = styled.View`
  position: absolute;
  width: 100%;
  background-color: #fff;
  border-radius: 15px;
  padding: 16px 13px 16px 19px;
`;

const Divider = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
`;

const TitleInput = styled.TextInput`
  margin-top: 12px;
  width: 100%;
  font-size: 20px;
  color: #102d2d;
`;

const Footer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
