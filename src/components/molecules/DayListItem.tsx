import React, {FC} from 'react';
import styled from '@emotion/native';
import {TouchableOpacityProps} from 'react-native';
import NanumFont from '../atoms/NanumFont';
import Icon from '../atoms/Icon';
import {ICategory} from '../../apis/category/useCategories';

export interface IDayCateogry extends ICategory, TouchableOpacityProps {
  type?: 'today' | 'someday';
  count?: number;
}

const DayListItem: FC<IDayCateogry> = ({type = 'today', count, ...props}) => {
  const name = type === 'today' ? 'Today' : 'Someday';

  return (
    <Container {...props}>
      <Name>
        <Icon type={type} width={18} height={18} style={{marginRight: 17}} />
        {name}
      </Name>

      {!!count && (
        <NumberTag>
          <Number>{count}</Number>
        </NumberTag>
      )}
    </Container>
  );
};

export default DayListItem;

const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled(NanumFont)`
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
