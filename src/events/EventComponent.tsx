import React, { ChangeEvent } from 'react';

const EventComponent = () => {

  // JSX inline function의 event와 onChange(기명함수)의 event type
  // typescript의 타입 추론을 통해 inline function은 event의 type이 무엇인지 기입하지 않아도 추론되지만
  // 외부 함수(callback function)를 통해 받는 경우 typescript가 타입추론을 하지 못하기에 어떤 event type인지 명시해야 한다.
  // 이것을 응용하여 inline으로 먼저 함수를 작성한 뒤, 추론된 event type을 외부함수에 적용하면 쉽게 event type을 알 수 있다.

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log(e.target.value);
  }

  const onDragStart = (event:React.DragEvent<HTMLDivElement>) => {
    console.log(event)
  }
  return (
    <div>
      <input onChange={onChange} />
      <div draggable='true' onDragStart={onDragStart}>Drag Me!</div>
    </div>
  );
};

export default EventComponent;