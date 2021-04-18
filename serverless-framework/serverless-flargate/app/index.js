const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  console.log('Starting..', new Date().toISOString())
  await sleep(2000)
  console.log("Finish task...", new Date().toISOString())
})()
