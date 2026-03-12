import React from 'react'
import { displayCardSx } from '../surfaces'
import {Box, Stack, Typography } from '@mui/material'
import IndicatorText from '../components/IndicatorText'
import Momentary from '../components/Momentary'
import HvacButton from '../components/HvacButton'
import HvacState from '../components/HvacLed'

export default function PageView({ controls}: any) {
    return (
        <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
        <Box sx={(theme) => ({ ...displayCardSx(theme), minHeight:0, width: '40%' })}>
        <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4 }} alignItems="center">
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                AC Controls
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Current Temp
                </Typography>
                <IndicatorText control={controls['HVAC v2']?.['currentTemp']} /> 
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <HvacButton control={controls['HVAC v2']?.['Up']} icon="KeyboardArrowUp"/>
                <IndicatorText control={controls['HVAC v2']?.['setPoint']} />
                <HvacButton control={controls['HVAC v2']?.['Down']} icon="KeyboardArrowDown"/>
                </Stack>
                <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Heat On
                    </Typography>
                    <HvacState control={controls['HVAC v2']?.['HeatOn']} color='red' icon='LocalFireDepartment' />
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Cool On
                    </Typography>
                    <HvacState control={controls['HVAC v2']?.['ACOn']} color='#0166FF' icon='AcUnit' />
                </Stack>
                </Stack>
            </Stack>
        </Stack>
        </Box>
        <Box sx={(theme) => ({ ...displayCardSx(theme), minHeight:0, width: '40%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:2, display: 'grid', gridTemplateRows: 'auto 1fr 1fr 1fr', alignItems: 'stretch'}} alignItems="center">
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Shades Controls
                </Typography>
                <Momentary control={controls['HVAC-Shades']?.['output.1.input.3.select']} label="Open Shades"/>
                <Momentary control={controls['HVAC-Shades']?.['output.1.input.2.select']} label="Custom Shades"/>
                <Momentary control={controls['HVAC-Shades']?.['output.1.input.1.select']} label="Close Shades"/>
            </Stack>
        </Box>
        </Stack>
    )
}