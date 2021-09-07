import React, {FC, useEffect, useState} from 'react';
import styled, {css} from '@emotion/native';
import Icon from '../atoms/Icon';
import NanumFont from '../atoms/NanumFont';
import NanumInput from '../atoms/NanumInput';
import KAModal from '../atoms/KAModal';
import {useRef} from 'react';
import {FlatList, TextInput, StyleSheet, View} from 'react-native';
import {useGetCategoriesApi} from '../../apis/categories/useGetCategoriesApi';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  initCategoryId?: number;
}

const CreateTodoModal: FC<IProps> = ({visible, setVisible, initCategoryId}) => {
  const {categories} = useGetCategoriesApi();

  const titleRef = useRef<TextInput | null>(null);
  const descRef = useRef<TextInput | null>(null);

  const [categoryListVisible, setCategoryListVisible] = useState(false);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const selectedCategory = categories?.[selectedCategoryIdx];

  const onFocus = () => {
    if (categoryListVisible) closeCategoryList();
  };

  const blur = () => {
    titleRef?.current?.blur?.();
    descRef?.current?.blur?.();
    if (categoryListVisible) closeCategoryList();
  };

  const closeCategoryList = () => setCategoryListVisible(false);
  const closeModal = () => setVisible(false);

  useEffect(() => {
    const idx = categories?.findIndex(({id}) => id === initCategoryId);
    if (idx > -1) setSelectedCategoryIdx(idx);
  }, [initCategoryId, categories, setSelectedCategoryIdx]);

  return (
    <KAModal
      visible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      onPressContent={blur}>
      <Content>
        <Header>
          <CategoryName>{selectedCategory?.name}</CategoryName>

          <Square onPress={() => setCategoryListVisible(prev => !prev)}>
            <Icon type={'down'} width={13} />
          </Square>
        </Header>

        <Divider />

        <TitleInput
          ref={titleRef}
          numberOfLines={1}
          placeholder={'New To-Do Title'}
          placeholderTextColor={'#c2c2c2'}
          onFocus={onFocus}
        />

        <DescInput
          ref={descRef}
          placeholder={'Description'}
          placeholderTextColor={'#c2c2c2'}
          multiline={true}
          textAlignVertical={'top'}
          onFocus={onFocus}
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

        {!!categoryListVisible && (
          <CategoryListContainer>
            <FlatList
              style={styles.categoryList}
              contentContainerStyle={styles.categoryListContent}
              data={categories}
              keyExtractor={({id}) => `category-${id}`}
              renderItem={({item, index}) => (
                <CategoryItem
                  onPress={() => {
                    setSelectedCategoryIdx(index);
                    closeCategoryList();
                  }}>
                  <CategoryItemName>{item?.name}</CategoryItemName>
                </CategoryItem>
              )}
            />
          </CategoryListContainer>
        )}
      </Content>
    </KAModal>
  );
};

export default CreateTodoModal;

const styles = StyleSheet.create({
  categoryList: css`
    flex: 1;
  `,
  categoryListContent: css`
    padding-left: 10px;
  `,
});

const Content = styled.View`
  position: absolute;
  width: 100%;
  height: 296px;
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

const CategoryListContainer = styled.View`
  position: absolute;
  top: 48px;
  right: -10px;
  min-width: 140px;
  max-height: 168px;
  border-radius: 9px;
  background-color: #fff;
  box-shadow: 0px 0px 24px #0000002d;
`;

const CategoryItem = styled.TouchableOpacity`
  min-width: 140px;
  height: 38px;
  justify-content: center;
`;

const CategoryItemName = styled(NanumFont)`
  font-size: 12px;
  color: #354242;
`;
