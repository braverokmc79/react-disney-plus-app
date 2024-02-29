import React from 'react'

const Footer = () => {
  return (
    <div style={{marginTop:"100px", marginBottom:"100px"}}>
        <div className="footer">
            <div className="footer__container">
                <div className="footer__logo">
                    <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} width={100} alt="Disney Plus logo" />
                </div>
                <div>
                    <h2 style={{textAlign:"center"}}>Disney Plus App</h2>
                </div>

              </div>    
              </div>    
    </div>
  )
}

export default Footer