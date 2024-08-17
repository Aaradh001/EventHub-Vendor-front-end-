import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CollapsView from '../../components/CollapsView'

function EventDetails() {
  return (
    <>
      <Header />
      <section className="w-full pt-40 md:pt-32 bg-white-100">

        <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
          <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder '>Event details</h1>
        </div>

        <div className="pl-8 pe-8 mb-5">
          <div>
            <h2 className='text-2xl'>Basic details</h2>
            <div className="card shadow p-5 bg-pink-50 w-full min-h-10 rounded-lg">
              <div className='border  w-full bg-gray-400'></div>
              <div className="grid grid-cols-2 flex items-center">
                <div className='pt-5 pb-5'>
                  <ul className='flex flex-col gap-3 font-medium'>
                    <li>
                      <div>
                        <span>Event name</span>
                        <span> : Adams Wedding</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Booking ID</span>
                        <span>: #43243432</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Event Type</span>
                        <span> : Wedding</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Guest Count</span>
                        <span>: 100</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Prefered Venus</span>
                        <span>: Ocean Blue</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='pt-5 pb-5'>
                  <div className='flex justify-between items-center'>
                    <div className="">
                      <div>
                        <div className="dateLabel flex items-center gap-5">
                          <label htmlFor="">From date</label>
                          <div className='p-3 border w-fit border-gray-300'>12-05-2023</div>
                        </div>
                      </div>
                      <div className='mt-3'>
                        <div className="dateLabel flex items-center gap-7">
                          <label htmlFor="">End date </label>
                          <div className='p-3 border w-fit border-gray-300'>12-05-2023</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='bg-white p-5 rounded-sm shadow'>
                        <h4>Overall Budjet : 40,0000</h4>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className='border  w-full bg-gray-400'></div>
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='text-2xl'>Requrement</h2>
            <div className="grid shadow grid-cols-2 bg-pink-50 shadow">
              <CollapsView />
              <CollapsView />
              <CollapsView />
              <CollapsView />
            </div>
          </div>


          <div className='mt-5'>
            <div className="grid shadow p-5 grid-cols-2 bg-pink-50 shadow">
              <div className='bg-white w-full min-h-10 p-5'>
                <div>
                  <h4 className='font-medium text-2xl'>Our charge's</h4>
                  <p>(Overll Client Budjet * 10%)</p>
                  <span className='text-red-700'>10,000 * 10%</span>
                </div>
                <div className='mt-3'>
                  <h4 className='font-medium text-2xl'>Our charge's</h4>
                  <p>(Overll Client Budjet * 10%)</p>
                  <span className='text-red-700'>10,000 * 10%</span>
                </div>
              </div>

              <div className='bg-white w-full min-h-10 p-5'>
                <div>
                  <div className='bg-black flex p-2 rounded-lg items-center'>
                    <button className='text-white p-3 pe-5 pl-5 rounded-lg'>Quote your Estimate </button>
                    <div className='flex-1'>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your estimate" required />
                    </div>
                  </div>
                  <button className='bg-red-700 text-white rounded-md mt-5 p-3'>Reject & Go Back</button>
                </div>
                <div className='mt-3'>
                  <h4 className='font-medium text-2xl'>Our charge's</h4>
                  <p>(Overll Client Budjet * 10%)</p>
                  <span className='text-red-700'>10,000 * 10%</span>
                </div>
              </div>

            </div>
          </div>



        </div>

      </section>
      <Footer />
    </>

  )
}

export default EventDetails