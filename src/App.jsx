import React,{ useState,useEffect,useRef } from 'react';
import ColorThief from 'colorthief';
import { BiCopy } from "react-icons/bi";

const App = () => {
    const fileInputRef = useRef(null)
    const [selectedFile,setSelectedFile] = useState("/Untitled.png")
    const [colorPalette, setColorPalette] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0]
      const image = URL.createObjectURL(file)
      // console.log(image)
      setSelectedFile(image)

      // console.log(file)
    }

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const getHexCode = (color) => {
      const hexCode = color
      .map((c) => c.toString(16))
      .join('')
      .toUpperCase();

      return `#${hexCode}`;
    }

    const copyToClipboard = (color,index) => {
      navigator.clipboard.writeText(color);
      setCopiedIndex(index);
    };

    useEffect(() => {
      const colorThief = new ColorThief();
      const imageElement = document.createElement('img');

      imageElement.addEventListener('load', () => {
        const palette = colorThief.getPalette(imageElement, 4);
        setColorPalette(palette);
      });

      imageElement.src = selectedFile;

    },[selectedFile,copiedIndex])

    // console.log(colorPalette)

  return (
    <main className="h-screen overflow-auto font-[Outfit]">
      <h2 className="text-3xl text-center m-16">Pick color from any image...</h2>

      <div className="flex justify-center items-center flex-wrap lg:gap-[10rem] md:gap-[2rem]">
        <div className="flex flex-col items-center gap-8">
          <div className="bg-[#fff] p-8 shadow-md lg:w-[33rem] md:w-[50%] sm:w-[30%]">
            <img src={selectedFile} alt="Image" className="w-full h-auto lg:w-full xl:w-full md:w-full"/>
          </div>

          <div>
            <input
              type="file"
              name=""
              id=""
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col  gap-10 md:mb-[5rem]">
          <div className="text-center">
            <h2>colors in this image : </h2>
          </div>
          <div className="flex">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  // width: "12rem",
                  // height: "7rem",
                  // position: "relative",
                  transition: "all 0.5s ease-in-out",
                }}
                className="relative lg:w-[11rem] lg:h-[5.5rem] mr-1 md:w-[8rem] md:h-[5rem]"
              >
                <div className='p-1'>
                  <BiCopy
                  className='float-right cursor-pointer text-[#F9FBE7]'
                  onClick={() => {
                    copyToClipboard(getHexCode(color));
                    setCopiedIndex(index)
                    setTimeout(() => setCopiedIndex(null),1000)
                  }}
                  />
                </div>
                <span
                  className="py-[2px] px-1 absolute bottom-[0] left-0 right-0 text-center font-medium shadow-lg"
                  style={{
                    // backgroundColor: `#${getHexCode(color)}`,
                    backgroundColor: `rgba(255,255,255,0.14)`,
                    color: '#02203c',
                    // color: '#F9FBE7',
                  }}
                >

                  <div className='border-t-[1px]'>
                    {/* {copied ? "copied" : getHexCode(color) } */}
                    {copiedIndex === index ? 'Copied!' : getHexCode(color)}
                     {/* {getHexCode(color)} */}
                  </div>
                </span>
              </div>
            ))}
          </div>
          <div className='h-[9rem] w-[22rem] bg-[#fff] shadow-lg flex justify-center items-center flex-col'>
            <button
              onClick={handleClick}
              className="border-[2px] px-12 py-2 bg-black text-white rounded-md hover:bg-[#fff] hover:border-black hover:border-2 hover:text-black"
            >
              Use Your image
            </button>
            <p className='p-4 text-center text-sm'>this palette generates four most dominant colors from the image.</p>
          </div>
        </div>
      </div>
      <div className="border-gray border-b-[1px] w-full relative bottom-[10rem] z-[-999]"></div>

    </main>
  );
}


export default App;