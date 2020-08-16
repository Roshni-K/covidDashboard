import React from "react";
import {MenuUnfoldOutlined} from '@ant-design/icons'

export default function ButtonAppBar(props) {
  return(
    <div className='topbarStyle'>
      <MenuUnfoldOutlined className='iconStyle' onClick={props.toggleDrawer} size='lg'/>
      <span className='topbarheader'>COVID 19 Report</span>
    </div>
  )
}
