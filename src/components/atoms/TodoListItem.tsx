import React, {FC, useRef} from 'react';
import styled from '@emotion/native';
import Checkbox from './Checkbox';
import NanumFont from './NanumFont';
import {ViewProps, Animated, PanResponder} from 'react-native';
import Icon from './Icon';

interface IProps extends ViewProps {
  checked: boolean;
  title: string;
}

const DEFAULT_PADDING = 10;

const TodoListItem: FC<IProps> = ({checked, title}) => {
  const gestureX = useRef(new Animated.Value(DEFAULT_PADDING)).current;
  const activatedOn = useRef<'center' | 'right'>('center');
  const lastOffset = useRef(DEFAULT_PADDING);

  const bgColor = gestureX.interpolate({
    inputRange: [0, DEFAULT_PADDING],
    outputRange: ['rgba(238, 242, 242, 1)', 'rgba(238, 242, 242, 0)'],
  });

  const rightWidth = gestureX.interpolate({
    inputRange: [0, DEFAULT_PADDING, DEFAULT_PADDING + 10],
    outputRange: [62, 0, 0],
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx}) => onSwiping(dx),
      onPanResponderRelease: () => release(),
      onPanResponderTerminate: () => release(),
    }),
  );

  const onSwiping = (dx: number) => {
    const currentX = lastOffset?.current + dx;
    if (currentX < DEFAULT_PADDING / 2) activatedOn.current = 'right';
    else activatedOn.current = 'center';

    if (currentX && currentX <= DEFAULT_PADDING + 10) {
      gestureX.setValue(currentX);
    }
  };

  const release = () => {
    const toValue = activatedOn?.current === 'center' ? DEFAULT_PADDING : 0;
    lastOffset.current = toValue;
    Animated.spring(gestureX, {
      toValue,
      friction: 9,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container
      style={{
        backgroundColor: bgColor,
        paddingLeft: gestureX,
        paddingRight: 4,
      }}>
      <SwipeableItem {...panResponder?.current?.panHandlers}>
        <ContentContainer>
          <Checkbox checked={checked} />
          <Title>{title}</Title>
        </ContentContainer>

        <RightContainer>
          <RightContent style={{width: rightWidth, overflow: 'hidden'}}>
            <Rect bgColor={'#ec8a8a'} onPress={() => console.log('trash')}>
              <Icon type={'trash'} width={14} />
            </Rect>

            <Rect bgColor={'#8aabec'} onPress={() => console.log('list')}>
              <Icon type={'list'} width={14} />
            </Rect>
          </RightContent>
        </RightContainer>
      </SwipeableItem>
    </Container>
  );
};

export default TodoListItem;

const Container = styled(Animated.View)`
  width: 100%;
  height: 36px;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
`;

const SwipeableItem = styled(Animated.View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.View`
  width: 62px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const RightContent = styled(Animated.View)`
  max-width: 62px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(NanumFont)`
  margin-left: 13px;
  font-size: 12px;
  line-height: 14px;
  color: #354242;
`;

const Rect = styled.TouchableOpacity<{bgColor: string}>`
  width: 28px;
  height: 28px;
  background-color: ${({bgColor}) => bgColor};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-left: 3px;
`;
