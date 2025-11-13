type ButtonProps = {
  text: string
  EventonClick: () => void
}

export default function Button({ text, EventonClick }: ButtonProps) {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Click Me! {count}
        </button>
      </div> */}

      <button onClick={EventonClick}> {text} </button>
    </>
  )
}