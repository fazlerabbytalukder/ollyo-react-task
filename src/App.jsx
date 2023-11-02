import { useState } from 'react';
import './App.css'
import Cards from './components/cards'

const list = [
  {
    id: "0",
    order: 0,
    image: 'https://i.ibb.co/x37RJt8/image-11.jpg',
  },
  {
    id: "1",
    order: 1,
    image: 'https://i.ibb.co/4dmgVRJ/image-10.jpg',
  },
  {
    id: "2",
    order: 2,
    image: 'https://i.ibb.co/dGQW6S7/image-9.webp',
  },
  {
    id: "3",
    order: 3,
    image: 'https://i.ibb.co/YDfmwFd/image-8.webp',
  },
  {
    id: "4",
    order: 4,
    image: 'https://i.ibb.co/g9rbRBw/image-7.webp',
  },
  {
    id: "5",
    order: 5,
    image: 'https://i.ibb.co/vX6Sn2m/image-6.webp',
  },
  {
    id: "6",
    order: 6,
    image: 'https://i.ibb.co/ggNtSQq/image-5.webp',
  },
  {
    id: "7",
    order: 7,
    image: 'https://i.ibb.co/dmfJpTg/image-4.webp',
  },
  {
    id: "8",
    order: 8,
    image: 'https://i.ibb.co/jgZTNBK/image-3.webp',
  },
  {
    id: "9",
    order: 9,
    image: 'https://i.ibb.co/cDM7w1b/image-2.webp',
  },
  {
    id: "10",
    order: 10,
    image: 'https://i.ibb.co/2WkP2wt/image-1.webp ',
  }
];



function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentList, setList] = useState(list);
  const [draggedCard, setDraggedCard] = useState(null);

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDelete = () => {
    const updatedList = currentList.filter((item) => !selectedItems.includes(item.id));
    setList(updatedList);
    setSelectedItems([]);
  };

  function handleSelectAll() {
    if (selectedItems.length === currentList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentList.map((item) => item.id));
    }
  }

  const handleDragStart = (id) => {
    setDraggedCard(id);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDrop = (id) => {
    if (draggedCard !== id) {
      const updatedList = [...currentList];
      const sourceIndex = currentList.findIndex((item) => item.id === draggedCard);
      const targetIndex = currentList.findIndex((item) => item.id === id);
      [updatedList[sourceIndex], updatedList[targetIndex]] = [updatedList[targetIndex], updatedList[sourceIndex]];
      setList(updatedList);
    }
  };

  const handleSwapCards = (sourceId, targetId) => {
    const sourceIndex = currentList.findIndex((item) => item.id === sourceId);
    const targetIndex = currentList.findIndex((item) => item.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const updatedList = [...currentList];
      [updatedList[sourceIndex], updatedList[targetIndex]] = [updatedList[targetIndex], updatedList[sourceIndex]];
      setList(updatedList);
    }
  };


  return (
    <div className="container mx-auto bg-white px-5 py-3 rounded-md">
      <div className='full-top-bar py-4 border-b border-b-gray-400'>
        {selectedItems.length <= 0 ? (
          <div className='gallery-title flex justify-start items-start'>
            <h2 className='text-lg font-semibold text-gray-900'>Gallery</h2>
          </div>
        ) : (
          <div className="select-and-delete flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length > 0}
                onChange={() => handleSelectAll()}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label className="ml-2 text-lg font-semibold text-gray-900">
                <span>{selectedItems.length}</span> File Selected
              </label>
            </div>
            <button
              onClick={handleDelete}
              className="text-lg font-semibold text-red-400"
              disabled={selectedItems.length === 0}
            >
              Delete file
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {currentList.map((item, index) => (
          <div key={item.id} className={`w-full h-auto ${index === 0 ? 'col-span-2 row-span-2' : 'col-auto row-auto'}`}>
            <Cards
              id={item.id}
              order={item.order}
              image={item.image}
              isSelected={selectedItems.includes(item.id)}
              onCheckboxChange={handleCheckboxChange}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              onSwapCards={handleSwapCards}
            />
          </div>
        ))}
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <img
                src="https://i.ibb.co/dKMWJQk/placeholder-removebg-preview.png"
                alt=""
                className="w-10 h-8 mb-4"
              />
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-400">Add Images</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}

export default App;
