<h1>Time</h1>

<h2>Date</h2>
<div>{new Date()}</div>

<h2>WorldTimeAPI</h2>
{#await fetch('http://worldtimeapi.org/api/ip') then response}
	{#await response.json() then json}
		<div>{json.datetime}</div>
		<div>{json.utc_datetime}</div>
		<div>{JSON.stringify(json)}</div>
	{:catch error}
		<div>Error: {error.message}</div>
	{/await}
{/await}
