import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import NanumFont from '../../components/atoms/NanumFont';
import Icon from '../../components/atoms/Icon';
import TabViewTmpl from './templates/TabSwitchTmpl';
import {useNav} from '../../contexts/Nav';
import {useState} from 'react';
import CreateTodoModal from '../../components/organisms/CreateTodoModal';

const TodoListScreen = () => {
  const {goBack} = useNav();

  const [visible, setVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff'}} />

      <Container>
        <TouchableOpacity onPress={goBack}>
          <Header>
            <HeaderTitle>
              <Icon
                type={'right'}
                style={{marginRight: 15, transform: [{rotate: '180deg'}]}}
                width={13}
                height={13}
              />
              {'Back to Category'}
            </HeaderTitle>
            <Icon type={'setting'} width={25} height={29} onPress={() => {}} />
          </Header>
        </TouchableOpacity>

        <Section marginTop={18} style={{paddingHorizontal: 25}}>
          <Title>{'Shopping List'}</Title>
          <Desc>{'6 Saved Items (60% Completed)'}</Desc>
        </Section>

        <Section marginTop={48} style={{flex: 1}}>
          <TabViewTmpl />
        </Section>

        <Footer>
          <Icon
            type={'plus'}
            width={44}
            height={44}
            onPress={() => setVisible(true)}
          />
        </Footer>
      </Container>

      <CreateTodoModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default TodoListScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Section = styled.View<{marginTop?: number}>`
  width: 100%;
  margin-top: ${({marginTop = 0}) => marginTop}px;
`;

const Header = styled.View`
  margin-top: 21px;
  padding: 0px 25px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled(NanumFont)`
  font-size: 15px;
  line-height: 14px;
  color: #c2c2c2;
`;

const Title = styled(NanumFont)`
  font-size: 30px;
  color: #102d2d;
`;

const Desc = styled(NanumFont)`
  margin-top: 9px;
  font-size: 13px;
  line-height: 13px;
  color: #c8c8c8;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-items: center;
`;
