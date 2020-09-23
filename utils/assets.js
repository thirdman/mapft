const getTrait = (traits, traitName) => {
  const filtered = traits.filter((trait) => trait.trait_type === traitName)
  const fileTrait = filtered && filtered[0]
  return fileTrait ? fileTrait.value : undefined
}

export { getTrait }
