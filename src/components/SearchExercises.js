import React, {useEffect, useState} from 'react'
import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {exerciseOptions, fetchData} from '../utils/fetchData'
import HorizontalScrollBar from './HorizontalScrollBar'


export default function SearchExercises({setExercises, bodyPart, setBodyPart}) {

  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    // to collect all 10 body part categories and save them in state
    async function fetchExerciseData() {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
      setBodyParts(["all", ...bodyPartsData])
    }
    fetchExerciseData()
  }, [])

  async function handleSearch() {
    if(search){
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)

      const searchedExercises = exerciseData.filter(
        (item) => item.name.toLowerCase().includes(search) 
                  || item.bodyPart.toLowerCase().includes(search)
                  || item.equipment.toLowerCase().includes(search)
                  || item.target.toLowerCase().includes(search)

      )
      setSearch('')
      setExercises(searchedExercises)
    }
  }

  return (
    <Stack
      alignItems="center"
      mt="37px"
      justifyContent="center"
      p="20px"
    >
      <Typography
        fontWeight={700}
        sx={{
          fontSize: {lg: '44px', xs: '30px'}
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You Should Know
      </Typography>
      <Box
        position="relative"
        mb="72px"
      >
        <TextField 
          sx={{
            input: {
              fontWeight: '700',
              boder: 'none', 
              borderRadius: '4px'
            },
            width: {lg: '1170px', xs: '350px'}, 
            backgroundColor: '#fff', 
            borderRadius: '40px'
          }}
          height="76px"
          placeholder="Search Exercises"
          type="text"
          value={search}
          onChange={(e) => {setSearch(e.target.value.toLowerCase())}}
        />
        <Button
          className="search-btn"
          sx={{
            backgroundColor: '#FF2625',
            color: '#FFF',
            textTransform: 'none',
            width: {lg: '175px', xs: '80px'},
            fontSize: {lg: '20px', xs: '14px'},
            height: '56px', 
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{position: 'relative', width: '100%', p: "20px"}}>
          <HorizontalScrollBar 
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            bodyParts={bodyParts}
          />
      </Box>

    </Stack>
  )
}
