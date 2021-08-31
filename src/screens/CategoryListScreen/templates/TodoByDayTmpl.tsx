import React from 'react';
import styled from '@emotion/native';
import NanumFont from '../../../components/atoms/NanumFont';
import Icon from '../../../components/atoms/Icon';

const TodoByDayTmpl = () => {
  return (
    <>
      <ItemButton>
        <ItemTitle>
          <Icon
            type={'today'}
            width={18}
            height={18}
            style={{marginRight: 17}}
          />
          {'Today'}
        </ItemTitle>

        <NumberTag>
          <Number>{'3'}</Number>
        </NumberTag>
      </ItemButton>

      <ItemButton style={{marginTop: 27}}>
        <ItemTitle>
          <Icon
            type={'someday'}
            width={18}
            height={18}
            style={{marginRight: 17}}
          />
          {'Someday'}
        </ItemTitle>

        <NumberTag>
          <Number>{'3'}</Number>
        </NumberTag>
      </ItemButton>
    </>
  );
};

export default TodoByDayTmpl;

const ItemButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemTitle = styled(NanumFont)`
  font-size: 17px;
  line-height: 24px;
  color: #102d2d;
`;

const NumberTag = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #57dadc;
  align-items: center;
  justify-content: center;
`;

const Number = styled(NanumFont)`
  font-size: 14px;
  line-height: 26px;
  color: #fff;
`;
