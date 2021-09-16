import React, {FC, useEffect, useState} from 'react';
import styled, {css} from '@emotion/native';
import Icon from '../atoms/Icon';
import KAModal from '../atoms/KAModal';
import {useRef} from 'react';
import {FlatList, TextInput, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useCategories} from '../../swr/categories';
import {useMutation} from '../../utils/hooks/useMutation';
import {request} from '../../utils/fetcher';
import {dayToDate} from '../../utils/parsers';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  defaultCategoryId?: number;
}

const CreateTodoModal: FC<IProps> = ({
  visible,
  setVisible,
  defaultCategoryId,
}) => {
  const {categories} = useCategories();
  const [postTodoApi] = useMutation<{
    categoryId: number;
    title: string;
    desc: string;
    dueDate: Date;
  }>(request.post);

  const titleRef = useRef<TextInput | null>(null);
  const descRef = useRef<TextInput | null>(null);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const selectedCategory = categories?.[selectedCategoryIdx];
  const [categoryListVisible, setCategoryListVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const reset = () => {
    setTitle('');
    setDesc('');
    setDueDate(null);
  };

  const blurInputs = () => {
    titleRef?.current?.blur?.();
    descRef?.current?.blur?.();
  };

  const onFocusInput = () => {
    closeCategoryList();
    closeCalendar();
  };

  const onPressBackground = () => {
    blurInputs();
    closeCategoryList();
    closeCalendar();
  };

  const toggleCategoryList = () => {
    blurInputs();
    closeCalendar();
    setCategoryListVisible(prev => !prev);
  };

  const toggleCalendar = () => {
    blurInputs();
    closeCategoryList();
    setCalendarVisible(prev => !prev);
  };

  const closeCategoryList = () => {
    categoryListVisible && setCategoryListVisible(false);
  };

  const closeCalendar = () => {
    calendarVisible && setCalendarVisible(false);
  };

  const closeModal = () => {
    setVisible(false);
    reset();
  };

  const submit = () => {
    if (!dueDate) return;
    closeModal();
    postTodoApi('/todos', {
      categoryId: selectedCategory?.id,
      title,
      desc,
      dueDate: dayToDate(dueDate),
    });
  };

  useEffect(() => {
    visible && titleRef?.current?.focus?.();
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const idx = categories?.findIndex(({id}) => id === defaultCategoryId);
      idx > -1 && setSelectedCategoryIdx(idx);
    }
  }, [defaultCategoryId, categories, setSelectedCategoryIdx, visible]);

  return (
    <KAModal
      visible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      onPressContent={onPressBackground}>
      <Content>
        <Header>
          <CategoryName>{selectedCategory?.name}</CategoryName>

          <Square onPress={toggleCategoryList}>
            <Icon type={'down'} width={13} />
          </Square>
        </Header>

        <Divider />

        <TitleInput
          ref={titleRef}
          value={title}
          onChangeText={setTitle}
          numberOfLines={1}
          placeholder={'New To-Do Title'}
          placeholderTextColor={'#c2c2c2'}
          onFocus={onFocusInput}
          onSubmitEditing={() => descRef?.current?.focus?.()}
        />

        <DescInput
          ref={descRef}
          value={desc}
          onChangeText={setDesc}
          placeholder={'Description'}
          placeholderTextColor={'#c2c2c2'}
          multiline={true}
          textAlignVertical={'top'}
          onFocus={onFocusInput}
          onSubmitEditing={submit}
        />

        <Footer>
          <CalendarButton onPress={toggleCalendar}>
            <Icon type={!!dueDate ? 'someday' : 'someday-gray'} />

            <SelectedDate value={dueDate}>
              {dueDate || 'Set to D-day'}
            </SelectedDate>
          </CalendarButton>

          <Icon
            type={'checked-circle'}
            width={40}
            height={40}
            onPress={submit}
          />
        </Footer>

        {categoryListVisible && (
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

        {calendarVisible && (
          <CalendarContainer>
            <Calendar
              style={styles.calendar}
              current={'2021-09-12'}
              minDate={'2021-09-12'}
              onDayPress={({dateString}) => {
                setDueDate(dateString);
                closeCalendar();
              }}
              markedDates={{
                ...(dueDate && {[dueDate]: {selected: true}}),
              }}
            />
          </CalendarContainer>
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
  calendar: css`
    border-radius: 9px;
    background-color: #fff;
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

const CategoryName = styled.Text`
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

const TitleInput = styled.TextInput`
  margin-top: 12px;
  width: 100%;
  font-size: 20px;
  line-height: 29px;
  color: #102d2d;
`;

const DescInput = styled.TextInput`
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

const SelectedDate = styled.Text<{value: string | null}>`
  margin-left: 6px;
  font-size: 14px;
  color: ${({value}) => (value ? '#102d2d' : '#c2c2c2')};
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

const CategoryItemName = styled.Text`
  font-size: 12px;
  color: #354242;
`;

const CalendarContainer = styled.View`
  position: absolute;
  bottom: 60px;
  left: 20px;
  width: 100%;
  border-radius: 9px;
  background-color: #fff;
  box-shadow: 0px 0px 24px #0000002d;
`;
