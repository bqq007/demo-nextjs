import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="flex text-1xl container mx-auto justify-between p-4 bg-red-700 text-white">
        <Link href="/">首页</Link>
        <Link href="/news">市房管局</Link>
        <Link href="/contact">市物协</Link>
        <Link href="/about">党的建设</Link>
        <Link href="/contact">会员之窗</Link>
        <Link href="/contact">企业风采</Link>        
    </div>
  )
}
