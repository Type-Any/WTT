import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native';
import Body from '../../components/atoms/Body';
import NanumFont from '../../components/atoms/NanumFont';
import Icon from '../../components/atoms/Icon';
import TodoByDayTmpl from './templates/TodoByDayTmpl';
import TodoByCategoryTmpl from './templates/TodoByCategoryTmpl';

const TodoListScreen = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff'}} />

      <Body>
        <Container>
          <Header>
            <Title>{'WHAT THE TODO'}</Title>
            <Icon type={'setting'} width={25} height={29} onPress={() => {}} />
          </Header>

          <Section marginTop={52}>
            <TodoByDayTmpl />
          </Section>

          <Section marginTop={23}>
            <Divider />
          </Section>

          <Section marginTop={21}>
            <TodoByCategoryTmpl />
          </Section>

          <Margin />

          <Footer>
            {/*  */}
            {/*  */}
          </Footer>
        </Container>
      </Body>
    </>
  );
};

export default TodoListScreen;

const Container = styled.View`
  flex: 1;
  padding: 30px 21px 0px 21px;
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

const Section = styled.View<{marginTop?: number}>`
  width: 100%;
  margin-top: ${({marginTop = 0}) => marginTop}px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
`;

const Margin = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  width: 100%;
`;
