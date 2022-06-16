export interface Country{
    id: number,
    designation: string,
    countryCode: string,
    flag:string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface State{
    id: number,
    designation: string,
    country:Country
}

export interface Region{
    id: number,
    designation: string,
    state?: State,
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export default defineEventHandler((event) => {
  //Hardcoded regions for now
  const regions: Region[] = [
    {
        "id": 1,
        "designation": "Goma",
        "status": true,
        "createdAt": new Date(),
        "updatedAt": new Date(),
    },
    {
        "id": 2,
        "designation": "Toronto",
        "status": true,
        "createdAt": new Date(),
        "updatedAt": new Date(),
    },
  ]

  return regions
})