import React, {FC} from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';

export interface IDayCateogry {
  id: number;
  name: string;
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

const Name = styled.Text`
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

const Number = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #fff;
`;
