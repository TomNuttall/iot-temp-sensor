import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TempData } from '../../lib/tempApi'
import SummaryOverview from '.'

describe('SummaryOverview', () => {
  it('renders with no TempData', async () => {
    // Arrange
    const tempData: TempData[] = []

    // Act
    render(<SummaryOverview tempData={tempData} />)

    // Assert
    expect(await screen.findByText('Min 0')).toBeInTheDocument()
    expect(await screen.findByText('Max 0')).toBeInTheDocument()
  })

  it('renders with TempData', async () => {
    // Arrange
    const minTemp = { temp: 0, time: 1 }
    const maxTemp = { temp: 20, time: 1 }
    const tempData: TempData[] = [maxTemp, minTemp]

    // Act
    render(<SummaryOverview tempData={tempData} />)

    // Assert
    expect(await screen.findByText(`Min ${minTemp.temp}`)).toBeInTheDocument()
    expect(
      await screen.findByText(`Max ${maxTemp.temp}`, { exact: false }),
    ).toBeInTheDocument()
  })
})
