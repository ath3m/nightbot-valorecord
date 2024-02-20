((
    /** @type {string} */ streamUptimeString,
    /** @type {string} */ streamStartDateString,
    /** @type {string} */ getMmrHistoryResponse,
    /** @type {string} */ getMatchesResponse,
  ) => {
    /* streamStartDateString will be a date string even if the channel is not currently live (the date will be the current
       date). This may be a Nightbot bug. This is why streamUptimeString is needed to check whether the channel is live */
    if (/\bnot live\b/i.test(streamUptimeString)) {
      return `Channel is not live.`;
    }
  
    const streamStartDate = new Date(streamStartDateString);
    if (Number.isNaN(streamStartDate.valueOf())) {
      return `Failed to parse stream start date: ${streamStartDateString}`.slice(0, 400);
    }
    
    const buffer = 5;
    const newStreamStartDate = new Date(streamStartDate.getTime() - buffer * 60000);
  
    try {
      /** @type {{
        readonly data: ReadonlyArray<{
          readonly mmr_change_to_last_game: number;
          readonly date_raw: number;
        }>;
      }} */
      
      let recordArr = [0, 0, 0]; /* D L W */
      let rrChangeThisStream = 0;
      let i = 0;
      const matchesData = getMatchesResponse.data;
      while (Date.parse(matchesData[i].meta.started_at)>newStreamStartDate){
        match_scores = matchesData[i].teams;
        const playerTeam = matchesData[i].stats.team.toLowerCase();     
        recordArr[match_scores["red"]==match_scores["blue"] ? 0 : (Object.keys(match_scores).reduce(function(a, b){ return match_scores[a] > match_scores[b] ? a : b }) == playerTeam) ? 2 : 1]++;
        rrChangeThisStream += getMmrHistoryResponse.data[i].last_mmr_change;
        i++;
      }
      const w=recordArr[2];
      const l=recordArr[1];
      const d=recordArr[0];
      const rr=rrChangeThisStream;    
      return `Today's Win/Loss/Draw record is ${w} - ${l} - ${d}. (${(rr>0?"+":"")+rr}RR)`;
    } catch (e) {
      return `Failed to parse Match history: ${e.message}: ${getMatchesResponse}`.slice(0, 400);
    }
  })