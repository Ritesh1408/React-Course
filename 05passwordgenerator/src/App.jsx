import { useState, useCallback, useEffect, useRef } from "react"


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charcaterAllowed, setCharcaterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // ref Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charcaterAllowed) str += "!@#$%^&*()_+"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charcaterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 9999);
    window.navigator.clipboard.writeText(passwordRef.current.value)
    alert("Password Copied to Clipboard")
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charcaterAllowed, passwordGenerator])


  // const passwordGenerator = () => {
  //   let result = "";
  //   let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  //   let numbers = "0123456789";
  //   let specialCharacters = "!@#$%^&*()_+";

  //   let allowedCharacters = characters;
  //   if (numberAllowed) {
  //     allowedCharacters += numbers;
  //   }
  //   if (charcaterAllowed) {
  //     allowedCharacters += specialCharacters;
  //   }

  //   for (let i = 0; i < length; i++) {
  //     result += allowedCharacters.charAt(
  //       Math.floor(Math.random() * allowedCharacters.length)
  //     );
  //   }

  //   setPassword(result);
  // }

  return (
    <>
      
      <div className="w-full max-w-md mx-auto bg-gray-700 rounded-lg shadow-md px-4 my-8 text-orange-600"> 
      <h1 className="text-4xl text-white text-center p-4 my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 text-white px-4"
          >Copy</button>

        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed ((numberAllowed) => !numberAllowed)}
          
          />
          <label htmlFor="numberInput">Numbers</label>

        </div>

        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox"
            defaultChecked={charcaterAllowed}
            id="characterInput"
            onChange={() => setCharcaterAllowed ((charcaterAllowed) => !charcaterAllowed)}
          
          
          />
          <label htmlFor="characterInput"> Characters</label>
        </div>
        </div>

      </div>
    </>
  )
}

export default App
