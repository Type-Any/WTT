import React from 'react';
import styled from '@emotion/native';
import {FlatList, SafeAreaView} from 'react-native';
import NanumFont from '../../components/atoms/NanumFont';
import Icon from '../../components/atoms/Icon';
import CategoryListItem from '../../components/molecules/CategoryListItem';
import Button from '../../components/atoms/Button';
import {useAuth} from '../../contexts/Api';
import {useCategoriesApi} from '../../apis/category/useCategories';
import DayListItem, {
  IDayCateogry,
} from '../../components/molecules/DayListItem';

const CategoryListScreen = () => {
  const {logoutAction} = useAuth();
  const {categories} = useCategoriesApi();

  const days: IDayCateogry[] = [
    {id: 99998, name: 'Today', type: 'today', count: 3},
    {id: 99999, name: 'Someday', type: 'someday', count: 4},
  ];

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff'}} />

      <Container>
        <Header>
          <Title>{'WHAT THE TODO'}</Title>
          <Icon
            type={'setting'}
            width={25}
            height={29}
            onPress={logoutAction}
          />
        </Header>

        <FlatList<IDayCateogry>
          style={{flex: 1}}
          contentContainerStyle={{paddingTop: 52}}
          data={[...days, ...categories]}
          keyExtractor={({id}) => `category_${id}`}
          ItemSeparatorComponent={Margin}
          renderItem={({item}) => {
            switch (item?.type) {
              case 'today':
                return <DayListItem {...item} />;
              case 'someday':
                return (
                  <>
                    <DayListItem {...item} />
                    <Divider />
                  </>
                );
              default:
                return <CategoryListItem {...item} />;
            }
          }}
        />
      </Container>

      <Footer>
        <FooterContent>
          <Button
            title={'Add New Category'}
            iconLeft={'list'}
            style={{marginBottom: 13}}
          />
          <Button
            title={'Add New Todo'}
            iconLeft={'list'}
            style={{marginBottom: 9}}
          />
          <Icon type={'plus'} width={44} height={44} onPress={() => {}} />
        </FooterContent>
      </Footer>
    </>
  );
};

export default CategoryListScreen;

const Container = styled.View`
  flex: 1;
  padding: 30px 21px 0px 21px;
  background-color: #fff;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(NanumFont)`
  font-size: 30px;
  color: #102d2d;
`;

const Divider = styled.View`
  margin-top: 23px;
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
`;

const Margin = styled.View`
  height: 25px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-items: center;
`;

const FooterContent = styled.View`
  width: 196px;
  align-items: center;
`;
