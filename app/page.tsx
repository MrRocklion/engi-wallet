
export default function Home() {
  return (
    <>
   <div className="flex flex-col h-screen w-full p-10 overflow-y-auto">
  <div className="grid grid-cols-4 grid-rows-6 lg:grid-rows-3 gap-4 flex-grow">
    <div className="bg-gray-900 rounded-lg col-span-4 h-96 lg:h-auto lg:col-span-1">1</div>
    <div className="bg-gray-900 rounded-lg col-span-4 lg:col-span-1">2</div>
    <div className="bg-gray-900 rounded-lg col-span-4 lg:col-span-1">3</div>
    <div className="bg-gray-900 rounded-lg col-span-4 lg:col-span-1">4</div>
    <div className="bg-gray-900 col-span-4 lg:col-span-2 lg:row-start-2 lg:row-span-2 rounded-lg">5</div>
    <div className="bg-gray-900 col-span-4 lg:col-span-2 lg:row-start-2 lg:row-span-2 rounded-lg">6</div>
  </div>
 
</div>
    
    </>
  );
}
