import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container hero-section'>
          <div className='row'>
            <Heading subtitle='WELCOME TO OUR PLATFORM' title='Code a New Career Through the Power of Gaming' />
            <p> Our innovative approach combines the excitement of gaming with the goal of achieving a recognized qualification. With us, you'll learn practical computer science skills while having a blast along the way. </p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
