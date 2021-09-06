import React, {FC, useState} from 'react';
import styled, {css} from '@emotion/native';
import MustTmpl from './MustTmpl';
import DoneTmpl from './DoneTmpl';
import NanumFont from '../../../components/atoms/NanumFont';
import {ITodo} from '../../../apis/todos/types';

export interface TodosTabViewProps {
  todos: ITodo[];
  dones: ITodo[];
}

interface ITab {
  key: 'MUST' | 'DONE';
  label: string;
}

const TabViewTmpl: FC<TodosTabViewProps> = ({todos, dones}) => {
  const tabs: ITab[] = [
    {key: 'MUST', label: `MUST (${todos?.length || 0})`},
    {key: 'DONE', label: `DONE (${dones?.length || 0})`},
  ];

  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedTab = tabs[focusedIdx];

  return (
    <Container>
      <TabBar>
        {tabs?.map(({key, label}, idx) => (
          <Tab
            key={key}
            label={label}
            focused={idx === focusedIdx}
            onPress={() => setFocusedIdx(idx)}
          />
        ))}
      </TabBar>

      <ContentContainer>
        {(() => {
          switch (focusedTab?.key) {
            case 'MUST':
              return <MustTmpl todos={todos} />;
            case 'DONE':
              return <DoneTmpl dones={dones} />;
          }
        })()}
      </ContentContainer>
    </Container>
  );
};

export default TabViewTmpl;

const Tab: FC<{
  label: string;
  focused?: boolean;
  onPress?: () => void;
}> = ({label, focused, onPress}) => {
  return (
    <TabButton focused={focused} onPress={onPress}>
      <TabLabel focused={focused}>{label}</TabLabel>
    </TabButton>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Content = styled.View<{focused?: boolean}>`
  ${({focused = false}) =>
    !focused &&
    css`
      display: none;
    `}
`;

const TabBar = styled.View`
  width: 100%;
  height: 30px;
  padding: 0px 25px;
  flex-direction: row;
`;

const TabButton = styled.TouchableOpacity<{focused?: boolean}>`
  margin-right: 19px;
  ${({focused = false}) =>
    focused &&
    css`
      border-bottom-color: #57dadc;
      border-bottom-width: 3px;
    `}
`;

const TabLabel = styled(NanumFont)<{focused?: boolean}>`
  font-size: 14px;
  line-height: 35px;
  color: ${({focused = false}) => (focused ? '#102d2d' : '#c8c8c8')};
`;
