import React, {FC, useState} from 'react';
import styled, {css} from '@emotion/native';
import MustTmpl from './MustTmpl';
import DoneTmpl from './DoneTmpl';
import NanumFont from '../../../components/atoms/NanumFont';

interface IProps {}

interface ITab {
  key: 'MUST' | 'DONE';
  label: string;
}

const TabViewTmpl: FC<IProps> = ({}) => {
  const [tabs] = useState<ITab[]>([
    {key: 'MUST', label: 'MUST (3)'},
    {key: 'DONE', label: 'DONE (5)'},
  ]);
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
              return <MustTmpl />;
            case 'DONE':
              return <DoneTmpl />;
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
