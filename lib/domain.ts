export type Goal={distance:number;date:string;days:number[]};
export type Activity={id:string;date:string;distance:number;minutes:number;effort:number;note:string};
export type Race={id:string;name:string;date:string;location:string;distance:number;type:string;demo:true};
export const races:Race[]=[
{id:"cinta-5k",name:"5K Amanecer · Cinta Costera",date:"2027-01-17",location:"Ciudad de Panamá",distance:5,type:"Ruta",demo:true},
{id:"trail-10k",name:"Senderos del Istmo · 10K",date:"2027-02-07",location:"Panamá Oeste",distance:10,type:"Trail",demo:true},
{id:"carrera-10k",name:"10K Ciudad Activa",date:"2027-02-21",location:"Ciudad de Panamá",distance:10,type:"Ruta",demo:true},
{id:"media-21k",name:"Media Maratón del Pacífico",date:"2027-03-14",location:"Ciudad de Panamá",distance:21.1,type:"Ruta",demo:true}
];
export function pace(distance:number,minutes:number){if(!(distance>0)||!(minutes>0))return "—";const p=minutes/distance;let mm=Math.floor(p),ss=Math.round((p-mm)*60);if(ss===60){mm++;ss=0}return mm+":"+String(ss).padStart(2,"0")+"/km"}
export function kmTotal(activities:Activity[]){return Math.round(activities.reduce((n,a)=>n+a.distance,0)*10)/10}
export function planSessions(goal:Goal,start=new Date()){const sessions:{date:string;title:string;minutes:number}[]=[];for(let week=0;week<4;week++){for(const day of goal.days){const today=new Date(start);const delta=(day-today.getDay()+7)%7+week*7;today.setDate(today.getDate()+delta);sessions.push({date:today.toISOString().slice(0,10),title:week%2?"Carrera continua":"Carrera suave",minutes:20+week*5})}}return sessions.sort((a,b)=>a.date.localeCompare(b.date))}
export function parseActivity(input:string){const m=input.match(/(?:corr[ií]|hice|registr[ae])\D*(\d+(?:[.,]\d+)?)\s*(?:km|kil[oó]metros?)/i);return m?Number(m[1].replace(",",".")):null}
