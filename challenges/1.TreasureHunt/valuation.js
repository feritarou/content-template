//   // TODO choose the scales of both maps and the coordinates of the aurora location in such a way 
//   // that the Aurora location is on a grid crossing when setting the zoom level so that a grid
//   // corresponds to the {feetPerUnit.mayan} 
export default function (_) {
  const mayanTreasureCoordinatesSample = {x: -3, y: 5}
  mayanTreasureCoordinatesSample.id = 'mayanTreasureCoordinatesSample'

  const localChurchCoordinatesSample = {x: 3.7, y: 9.2}
  localChurchCoordinatesSample.id = 'localChurchCoordinatesSample'

  const feetPerUnit = {
    mayan: 6000,
    local: 1000 // this is not defined here but in the coordinate system
  }
  // TODO choose the scales of both maps and the coordinates of the aurora location in such a way 
  // that the Aurora location is on a grid crossing when setting the zoom level so that a grid
  // corresponds to the {feetPerUnit.mayan}

  const localChurchCoordinatesSampleX = localChurchCoordinatesSample.x
  const localChurchCoordinatesSampleY = localChurchCoordinatesSample.y

  const mayanMapWithGridURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/mayanMapWithGrid.png`
  const coordinatesURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/coordinates.png`
  const localAuroraURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localAurora.png`
  const localTreasureURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localTreasure.png`
  const localTreasure1URL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localTreasure1.png`
  const localTreasure12URL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localTreasure12.png`
  const localTreasure2URL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localTreasure2.png`
  const localTreasureFullVerticalURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localTreasureFullVertical.png`
  const localTreasureTwoVerticalsOnlyURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/localTreasureTwoVerticalsOnly.png`
  const mayanAuroraURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/mayanAurora.png`
  const mayanBrochureGridUnitURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/mayanBrochureGridUnit.jpg`
  const mayanMapEmphasizeGridAndTreasureCrossURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/mayanMapEmphasizeGridAndTreasureCross.png`
  const mayanMapEmphasizeGridAndTreasureCrossWithShadowLinesURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(3.7%2C9.2)_t(-3%2C5)/mayanMapEmphasizeGridAndTreasureCrossWithShadowLines.png`
  const mayanMapEmphasizeOriginURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/mayanMapEmphasizeOrigin.png`
  const mayanTreasureURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/mayanTreasure.png`
  const pointVectorSchemasForHandheldURL = `https://storage.googleapis.com/mastory-content/units/CoordinatePlane/parametrized_images/c(${localChurchCoordinatesSample.x}%2C${localChurchCoordinatesSample.y})_t(${mayanTreasureCoordinatesSample.x}%2C${mayanTreasureCoordinatesSample.y})/pointVectorSchemasForHandheld.png`

  return {
    localChurchCoordinatesSampleX,
    localChurchCoordinatesSampleY,
    mayanMapEmphasizeGridAndTreasureCrossWithShadowLinesURL,
    mayanTreasureCoordinatesSample,
    localChurchCoordinatesSample,
    feetPerUnit,
    mayanMapWithGridURL,
    coordinatesURL,
    localAuroraURL,
    localTreasureURL,
    localTreasure1URL,
    localTreasure12URL,
    localTreasure2URL,
    localTreasureFullVerticalURL,
    localTreasureTwoVerticalsOnlyURL,
    mayanAuroraURL,
    mayanBrochureGridUnitURL,
    mayanMapEmphasizeGridAndTreasureCrossURL,
    mayanMapEmphasizeOriginURL,
    mayanTreasureURL,
    pointVectorSchemasForHandheldURL
  }
}

