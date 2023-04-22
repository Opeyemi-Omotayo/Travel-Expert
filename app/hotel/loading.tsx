import React from 'react'

const loading = () => {
  return (
    <main>
      <div className="overflow-hidden h-96 animate-pulse bg-slate-200">
        <div className={`bg-center h-full`} />
      </div>
      <div className="flex items-start justify-between w-2/3 m-auto 0 -mt-9">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <nav className="flex pb-2 border-b text-reg">
            <h4 className="mr-7">Overview</h4>
            <p className="mr-7">Menu</p>
          </nav>

          <div className="mt-4 border-b pb-6 animate-pulse bg-slate-200 w-[400px] h-16 rounded"></div>

          <div className="flex items-end animate-pulse">
            <div className="flex items-center mt-2 ratings">
              <div className="flex items-center w-56 bg-slate-200"></div>
              <p className="ml-3 text-reg"></p>
            </div>
            <div>
              <p className="ml-4  text-reg"> </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default loading
