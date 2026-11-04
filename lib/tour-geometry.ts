// Pure layout math for the Fasty walkthrough. Kept separate from React so
// very tall cards cannot accidentally become oversized or invisible spotlights.
export type TourFocus={top:number;left:number;width:number;height:number};
export type AnchorBox={top:number;left:number;width:number;height:number};
export type TourViewport={width:number;height:number;panelTop:number;mobile:boolean};

export function clipTourFocus(box:AnchorBox,view:TourViewport):TourFocus|null{
 const {width,height,panelTop,mobile}=view;
 if(![box.top,box.left,box.width,box.height,width,height,panelTop].every(Number.isFinite))return null;
 if(width<=0||height<=0||box.width<=0||box.height<=0)return null;
 const limit=mobile?Math.min(height-12,panelTop-15):height-18;
 if(box.top>limit-24||box.top+box.height<8)return null;
 const top=Math.max(8,box.top-7);
 const bottom=Math.min(box.top+box.height+7,limit);
 if(bottom-top<18)return null;
 const left=Math.max(7,box.left-7);
 const right=Math.min(width-7,box.left+box.width+7);
 if(right-left<18)return null;
 return{top,left,width:right-left,height:bottom-top};
}
