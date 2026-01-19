import React from 'react'
import Card, { CardContent, CardHeader } from '../../ibd-ibs-pcos-core/components/ui/Card'
import Button from '../../ibd-ibs-pcos-core/components/ui/Button'
import Chip from '../../ibd-ibs-pcos-core/components/ui/Chip'

export default function UIPreview(){
  return (
    <div className="p-4">
      <h2 className="text-lg mb-3">UI Preview</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card><CardHeader>Card Header</CardHeader><CardContent>Content</CardContent></Card>
        <div className="p-3"><Button>Primary</Button></div>
        <div className="p-3"><Chip>Vegetarian</Chip></div>
      </div>
    </div>
  )
}
