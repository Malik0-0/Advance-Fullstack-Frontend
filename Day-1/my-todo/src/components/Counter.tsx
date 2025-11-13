type CounterProps= {
    text: number;
  }

type CounterProps2 = {
  text: string;
}

export default function Counter({text}: CounterProps){
    return <p>{text}</p>
}

export function CounterConditional({ text }: CounterProps2) {
  return (
    <>
      <hr/>
      <p>{text}</p>
    </>
  )
}