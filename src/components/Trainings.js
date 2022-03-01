import React from 'react'
import { List, ListItem, Box } from '@material-ui/core';
import { useUserAuth } from "../contexts/UserAuthContext"

export const Trainings = ({ trainings, date }) => {
    const {user} = useUserAuth()
    return (
        <List>
            {trainings.map(training => {
               if (date == training.date && training.userId == user.email
               ) {
                return (
                    <Box key = {training.title}>
                    <ListItem key = {training.title}>                    
                        <h1>{training.title}</h1>
                    </ListItem>
                    <ListItem><h2>Distance</h2><p style = {{paddingLeft: "17%"}}>{training.distance} km</p></ListItem>
                    <ListItem><h2>Pace</h2><p style = {{paddingLeft: "30%"}}>{training.pace}/km</p></ListItem>
                    </Box>
                ) }
                else {
                    return
                }
            })}

        </List>
    )
}