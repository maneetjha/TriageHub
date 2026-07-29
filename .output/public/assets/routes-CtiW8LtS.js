import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./index-DS2UTsww.js";function c(e){if(Array.isArray(e))return e.flatMap(e=>c(e));if(typeof e!=`string`)return[];let t=[],n=0,r,i,a,o,s,l=()=>{for(;n<e.length&&/\s/.test(e.charAt(n));)n+=1;return n<e.length},u=()=>(i=e.charAt(n),i!==`=`&&i!==`;`&&i!==`,`);for(;n<e.length;){for(r=n,s=!1;l();)if(i=e.charAt(n),i===`,`){for(a=n,n+=1,l(),o=n;n<e.length&&u();)n+=1;n<e.length&&e.charAt(n)===`=`?(s=!0,n=o,t.push(e.slice(r,a)),r=n):n=a+1}else n+=1;(!s||n>=e.length)&&t.push(e.slice(r))}return t}function l(e){return e instanceof Headers?e:Array.isArray(e)||typeof e==`object`?new Headers(e):null}function u(...e){return e.reduce((e,t)=>{let n=l(t);if(!n)return e;for(let[t,r]of n.entries())t===`set-cookie`?c(r).forEach(t=>e.append(`set-cookie`,t)):e.set(t,r);return e},new Headers)}function d(e){return e!==`__proto__`&&e!==`constructor`&&e!==`prototype`}function f(e,t){let n=Object.create(null);if(e)for(let t of Object.keys(e))d(t)&&(n[t]=e[t]);if(t&&typeof t==`object`)for(let e of Object.keys(t))d(e)&&(n[e]=t[e]);return n}function p(e){if(!e)return Object.create(null);let t=Object.create(null);for(let n of Object.keys(e))d(n)&&(t[n]=e[n]);return t}var m=()=>{throw Error(`createServerOnlyFn() functions can only be called on the server!`)},h=(e,t)=>{let r=t||e||{};r.method===void 0&&(r.method=`GET`);let a=e=>h(void 0,{...r,validator:e,inputValidator:e});return Object.assign(e=>h(void 0,{...r,...e}),{options:r,middleware:e=>{let t=[...r.middleware||[]];e.map(e=>{i in e?e.options.middleware&&t.push(...e.options.middleware):t.push(e)});let n=h(void 0,{...r,middleware:t});return n[i]=!0,n},validator:a,inputValidator:a,handler:(...e)=>{let[t,i]=e,a={...r,extractedFn:t,serverFn:i},o=[...a.middleware||[],y(a)];return t.method=r.method,Object.assign(async e=>{let r=await g(o,`client`,{...t,...a,data:e?.data,headers:e?.headers,signal:e?.signal,fetch:e?.fetch,context:p()}),i=n(r.error);if(i)throw i;if(r.error)throw r.error;return r.result},{...t,method:r.method,__executeServer:async e=>{let n=m(),r=n.contextAfterGlobalMiddlewares;return await g(o,`server`,{...t,...e,serverFnMeta:t.serverFnMeta,context:f(e.context,r),request:n.request}).then(e=>({result:e.result,error:e.error,context:e.sendContext}))}})}})};async function g(t,n,r){let i=_([...e()?.functionMiddleware||[],...t]);if(n===`server`){let e=m({throwIfNotFound:!1});e?.executedRequestMiddlewares&&(i=i.filter(t=>!e.executedRequestMiddlewares.has(t)))}let o=async e=>{let t=i.shift();if(!t)return e;try{let r=`validator`in t.options?t.options.validator:void 0;!r&&`inputValidator`in t.options&&(r=t.options.inputValidator),r&&n===`server`&&(e.data=await v(r,e.data));let i;if(n===`client`?`client`in t.options&&(i=t.options.client):`server`in t.options&&(i=t.options.server),i){let t=async(t={})=>{let n=await o({...e,...t,context:f(e.context,t.context),sendContext:f(e.sendContext,t.sendContext),headers:u(e.headers,t.headers),_callSiteFetch:e._callSiteFetch,fetch:e._callSiteFetch??t.fetch??e.fetch,result:t.result===void 0?t instanceof Response?t:e.result:t.result,error:t.error??e.error});if(n.error)throw n.error;return n},n=await i({...e,next:t});if(a(n))return{...e,error:n};if(n instanceof Response)return{...e,result:n};if(!n)throw Error(`User middleware returned undefined. You must call next() or return a result in your middlewares.`);return n}return o(e)}catch(t){return{...e,error:t}}};return o({...r,headers:r.headers||{},sendContext:r.sendContext||{},context:r.context||p(),_callSiteFetch:r.fetch})}function _(e,t=100){let n=new Set,r=[],i=(e,a)=>{if(a>t)throw Error(`Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`);e.forEach(e=>{e.options.middleware&&i(e.options.middleware,a+1),n.has(e)||(n.add(e),r.push(e))})};return i(e,0),r}async function v(e,t){if(e==null)return{};if(`~standard`in e){let n=await e[`~standard`].validate(t);if(n.issues)throw Error(JSON.stringify(n.issues,void 0,2));return n.value}if(`parse`in e)return e.parse(t);if(typeof e==`function`)return e(t);throw Error(`Invalid validator type!`)}function y(e){return{"~types":void 0,options:{inputValidator:e.validator??e.inputValidator,client:async({next:t,sendContext:n,fetch:r,...i})=>{let a={...i,context:n,fetch:r};return t(await e.extractedFn?.(a))},server:async({next:t,...n})=>{let r=await e.serverFn?.(n);return t({...n,result:r})}}}}var b=t(o()),ee=[{ticket_id:`TCK-1110`,subject:`VIP membership inactive on my account`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.12.1, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1096`,subject:`Episode 25 locked despite using 10 coins`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1045`,subject:`Charged after cancelling VIP membership`,body:`Where is the cancel button for PocketToons VIP? It keeps giving me an error message when I click 'Manage Subscription'. Stop billing my card!`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1004`,subject:`Unauthorized auto-renewal after cancellation`,body:`I noticed a charge of $49.99 from PocketToons on my credit card today. I cancelled my subscription last month! This is an unauthorized charge. Refund me now or I will file a bank chargeback.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Category escalation trigger ('chargeback') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category escalation trigger ('chargeback') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1015`,subject:`Need refund for coin pack - child purchased by mistake`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-399105 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1099`,subject:`Episode 25 locked despite using 10 coins`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1083`,subject:`Purchased 1000 coins but balance is still 0`,body:`Payment was successful on Google Play but the app threw an error 'Transaction Pending' and my coins are missing. Please help credit them.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1005`,subject:`Unauthorized auto-renewal after cancellation`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-653306.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1057`,subject:`Duplicate charge on my credit card receipt #ORD-126925`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-126925. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1134`,subject:`Downloaded episodes won't play offline`,body:`Downloads get stuck at 99% and fail with code ERR_STORAGE_WRITE. Device has over 30GB free storage available.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.29,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.29 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.29 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1070`,subject:`Need refund for coin pack - child purchased by mistake`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-478411 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1027`,subject:`Unrecognized charge of $49.99 on my statement`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1094`,subject:`VIP membership inactive on my account`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.10.4, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1001`,subject:`Refund request for accidental purchase`,body:`The audio quality of the series 'The Billionaire's Secret' is unlistenable and muffled. I want a refund of the $9.99 VIP pass I bought 2 hours ago.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Refund Request`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Support regarding your refund request.

We understand accidental purchases can happen. We have logged your request. If this purchase was made within the last 14 days and the coin balance/content remains unused, our billing system will automatically process a full refund to your original payment method within 24-48 hours.

Please confirm your Order ID if you haven't attached it yet so we can expedite your processing.

Best regards,
PocketToons Billing Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1193`,subject:`Audio volume balance between voice and background music`,body:`I love the audio show 'Vampire Prince', but the background music is way too loud compared to the narrator's voice. Could you adjust the audio mixing in future episodes?`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.57,sentiment:`Positive`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.57 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.57 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1023`,subject:`Fraudulent charge from PocketToons`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-221035.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1192`,subject:`Library organization suggestion`,body:`Please add a folder or playlist feature in 'My Library' to organize finished vs. ongoing shows.`,predicted_category:`Feedback & General`,predicted_subcategory:`App UI / UX Suggestion`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1151`,subject:`Audio speeds up and sounds robot-like`,body:`Whenever I play any audio show, the track plays 5 seconds then buffers endlessly. My internet connection is fast (100 Mbps). Device: Xiaomi Redmi Note 12 (Android 13).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1136`,subject:`Audio speeds up and sounds robot-like`,body:`Whenever I play any audio show, the track plays 5 seconds then buffers endlessly. My internet connection is fast (100 Mbps). Device: Web Browser (Chrome 122).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1118`,subject:`VIP membership inactive on my account`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.10.4, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1017`,subject:`Cannot cancel monthly subscription`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Subscription Cancellation Issue`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thanks for reaching out to PocketToons. We're sorry to see you go!

We have verified your account and stopped any future recurring auto-renewals for your subscription. You will continue to have full access to your VIP privileges until the end of your current billing cycle.

You can also manage your subscriptions directly via your device settings:
• iOS: Settings > Apple ID > Subscriptions > PocketToons
• Android: Play Store > Profile > Payments & subscriptions > Subscriptions

Let us know if you need anything else!

Warm regards,
PocketToons Customer Care`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1029`,subject:`Charged after cancelling VIP membership`,body:`Where is the cancel button for PocketToons VIP? It keeps giving me an error message when I click 'Manage Subscription'. Stop billing my card!`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1127`,subject:`Purchased 1000 coins but balance is still 0`,body:`Hey support, I bought 500 coins for $9.99. Receipt #ORD-437758 received, but coins haven't shown up after restarting the app. User ID: USR-13478.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1035`,subject:`Double billing issue on order ORD-945687`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-945687. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Double Billing`,confidence_score:.87,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1146`,subject:`App freeze during coin checkout`,body:`Crash report: app crashes every time I try to play Episode 10 of any series.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1178`,subject:`Login error code 500`,body:`I'm trying to log in using my phone number, but the 6-digit OTP SMS code is never delivered to my phone. I tried 5 times. Please help me log in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1048`,subject:`Cannot cancel monthly subscription`,body:`Please cancel my subscription immediately and send confirmation to my email. I do not want auto-renew enabled.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Subscription Cancellation Issue`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thanks for reaching out to PocketToons. We're sorry to see you go!

We have verified your account and stopped any future recurring auto-renewals for your subscription. You will continue to have full access to your VIP privileges until the end of your current billing cycle.

You can also manage your subscriptions directly via your device settings:
• iOS: Settings > Apple ID > Subscriptions > PocketToons
• Android: Play Store > Profile > Payments & subscriptions > Subscriptions

Let us know if you need anything else!

Warm regards,
PocketToons Customer Care`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1112`,subject:`Restore purchase not working for VIP pass`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.11.8, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1173`,subject:`Login error code 500`,body:`I'm trying to log in using my phone number, but the 6-digit OTP SMS code is never delivered to my phone. I tried 5 times. Please help me log in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1020`,subject:`Refund request for accidental purchase`,body:`My 6-year-old toddler tapped the screen and accidentally bought the 2000 coins pack for $29.99. None of the coins have been used yet. Can you please process a refund?`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Refund Request`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Support regarding your refund request.

We understand accidental purchases can happen. We have logged your request. If this purchase was made within the last 14 days and the coin balance/content remains unused, our billing system will automatically process a full refund to your original payment method within 24-48 hours.

Please confirm your Order ID if you haven't attached it yet so we can expedite your processing.

Best regards,
PocketToons Billing Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1198`,subject:`Suggestion for narrator sound quality`,body:`Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.78,sentiment:`Positive`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1168`,subject:`OTP SMS code not arriving`,body:`I'm trying to log in using my phone number, but the 6-digit OTP SMS code is never delivered to my phone. I tried 5 times. Please help me log in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1176`,subject:`GDPR data deletion request`,body:`I want to close my account permanently. How do I delete my profile data?`,predicted_category:`Account & Security`,predicted_subcategory:`Account Deletion Request`,confidence_score:.83,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1085`,subject:`Missing coin purchase`,body:`Payment was successful on Google Play but the app threw an error 'Transaction Pending' and my coins are missing. Please help credit them.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1067`,subject:`Requesting refund for Order #ORD-882169`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-882169 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1030`,subject:`Double billing issue on order ORD-140605`,body:`Hello team, I was charged twice for the monthly VIP pass ($14.99 x 2). I only pressed subscribe once. Please reverse the duplicate payment immediately.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Double Billing`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1188`,subject:`Feature request: Playback speed control 2.5x`,body:`Please add a folder or playlist feature in 'My Library' to organize finished vs. ongoing shows.`,predicted_category:`Feedback & General`,predicted_subcategory:`Content Catalog Request`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1187`,subject:`Feedback on narrator for 'Vampire Prince'`,body:`Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.66,sentiment:`Positive`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1156`,subject:`Crash when opening 'My Library' tab`,body:`Crash report: app crashes every time I try to play Episode 10 of any series.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1114`,subject:`Episode 25 locked despite using 10 coins`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1181`,subject:`My coin balance was drained by an unauthorized login`,body:`Urgent: Unauthorized password change notification received. I did not request this. Freeze my account to prevent fraud!`,predicted_category:`Account & Security`,predicted_subcategory:`Account Deletion Request`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Account security / compromise alert | Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Account security / compromise alert | Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1043`,subject:`Charged after cancelling VIP membership`,body:`Where is the cancel button for PocketToons VIP? It keeps giving me an error message when I click 'Manage Subscription'. Stop billing my card!`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1100`,subject:`Purchased 1000 coins but balance is still 0`,body:`Payment was successful on Google Play but the app threw an error 'Transaction Pending' and my coins are missing. Please help credit them.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1092`,subject:`Episode 25 locked despite using 10 coins`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1080`,subject:`VIP membership inactive on my account`,body:`Paid $49.99 for yearly VIP membership. Order #ORD-402630. Still showing lock icons on exclusive episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.41,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.41 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.41 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1191`,subject:`Please add Dark Mode support`,body:`Please add a folder or playlist feature in 'My Library' to organize finished vs. ongoing shows.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1039`,subject:`Fraudulent charge from PocketToons`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-596171.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1126`,subject:`Missing coin purchase`,body:`Payment was successful on Google Play but the app threw an error 'Transaction Pending' and my coins are missing. Please help credit them.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1167`,subject:`Permanently close my PocketToons account`,body:`Under GDPR / CCPA regulations, I hereby request the permanent deletion of my PocketToons account (User ID: USR-88172) and all associated personal data from your systems.`,predicted_category:`Account & Security`,predicted_subcategory:`Account Deletion Request`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1049`,subject:`Charged after cancelling VIP membership`,body:`Where is the cancel button for PocketToons VIP? It keeps giving me an error message when I click 'Manage Subscription'. Stop billing my card!`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1055`,subject:`I did not authorize this purchase`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-751517.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1144`,subject:`Storage full error despite 20GB free space`,body:`Downloaded files disappeared from my library after signing out and signing back in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.3,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.30 < 0.60) | Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.30 < 0.60) | Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1022`,subject:`Fraudulent charge from PocketToons`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-974244.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1108`,subject:`Episode 25 locked despite using 10 coins`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1186`,subject:`Remove my personal info from your servers`,body:`Please delete my account and purge my email address and payment history from your database.`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.64,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('delete my account')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('delete my account')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1026`,subject:`Cannot cancel monthly subscription`,body:`Where is the cancel button for PocketToons VIP? It keeps giving me an error message when I click 'Manage Subscription'. Stop billing my card!`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Double Billing`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support! We apologize for the inconvenience caused by the duplicate charge on your account.

We have submitted a reversal request for your second transaction. Depending on your financial institution or app store (Apple App Store / Google Play), the refunded amount should reflect in your bank statement within 3 to 5 business days.

If you need further assistance with your transaction receipts, please reply directly to this thread.

Warm regards,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1072`,subject:`Episode 25 locked despite using 10 coins`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1009`,subject:`I did not authorize this purchase`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1162`,subject:`Crash when opening 'My Library' tab`,body:`Ever since updating to v3.10.4, the PocketToons app crashes immediately to the home screen upon launch. I cleared cache and reinstalled but issue persists on Pixel 8 (Android 14).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1199`,subject:`Sleep timer option request`,body:`Please add a folder or playlist feature in 'My Library' to organize finished vs. ongoing shows.`,predicted_category:`Feedback & General`,predicted_subcategory:`Content Catalog Request`,confidence_score:.38,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.38 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.38 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1179`,subject:`Request to delete my account and personal data`,body:`I want to close my account permanently. How do I delete my profile data?`,predicted_category:`Account & Security`,predicted_subcategory:`Account Deletion Request`,confidence_score:.81,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('delete my account')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('delete my account')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1102`,subject:`Purchased 1000 coins but balance is still 0`,body:`I purchased the $14.99 coin pack 30 minutes ago via Apple Pay. Money was deducted from my account (Order #ORD-532067), but my in-app coin wallet still shows 0. Please credit my coins!`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1174`,subject:`Urgently help - someone hacked my account!`,body:`I can no longer log into my account with my email. It says 'User does not exist'. I think my account was hacked and email was changed without my permission.`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Account security / compromise alert | Category 'Account & Security' requires human agent review | Category escalation trigger ('hacked') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Account security / compromise alert | Category 'Account & Security' requires human agent review | Category escalation trigger ('hacked') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1036`,subject:`Refund for unlistened audiobook season`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-854717 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1058`,subject:`Fraudulent charge from PocketToons`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-831059.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1097`,subject:`Purchased annual VIP pass but still seeing ads and paywalls`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.12.1, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1123`,subject:`Purchased 1000 coins but balance is still 0`,body:`Hey support, I bought 500 coins for $9.99. Receipt #ORD-475644 received, but coins haven't shown up after restarting the app. User ID: USR-46048.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1010`,subject:`Double billing issue on order ORD-790993`,body:`Hello team, I was charged twice for the monthly VIP pass ($14.99 x 2). I only pressed subscribe once. Please reverse the duplicate payment immediately.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Double Billing`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1086`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1153`,subject:`Audio speeds up and sounds robot-like`,body:`The audio player pitch is distorted and plays at 2x speed automatically even when 1x is selected. Please fix this player bug.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1109`,subject:`Episode 25 locked despite using 10 coins`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1090`,subject:`VIP status lost after app update`,body:`Paid $49.99 for yearly VIP membership. Order #ORD-197736. Still showing lock icons on exclusive episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.56,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.56 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.56 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1076`,subject:`Coins deducted but episode won't play`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1006`,subject:`Charged after cancelling VIP membership`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1175`,subject:`Permanently close my PocketToons account`,body:`Please delete my account and purge my email address and payment history from your database.`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.74,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('delete my account')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('delete my account')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1052`,subject:`Fraudulent charge from PocketToons`,body:`I noticed a charge of $49.99 from PocketToons on my credit card today. I cancelled my subscription last month! This is an unauthorized charge. Refund me now or I will file a bank chargeback.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Category escalation trigger ('chargeback') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category escalation trigger ('chargeback') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1047`,subject:`I did not authorize this purchase`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1138`,subject:`Audio speeds up and sounds robot-like`,body:`The audio player pitch is distorted and plays at 2x speed automatically even when 1x is selected. Please fix this player bug.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1018`,subject:`Charged twice for 500 Coin Pack`,body:`Hello team, I was charged twice for the monthly VIP pass ($14.99 x 2). I only pressed subscribe once. Please reverse the duplicate payment immediately.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1056`,subject:`Unrecognized charge of $49.99 on my statement`,body:`I noticed a charge of $49.99 from PocketToons on my credit card today. I cancelled my subscription last month! This is an unauthorized charge. Refund me now or I will file a bank chargeback.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Category escalation trigger ('chargeback') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category escalation trigger ('chargeback') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1014`,subject:`How to stop recurring billing?`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1002`,subject:`Unauthorized auto-renewal after cancellation`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1130`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1177`,subject:`Account compromised / Security breach`,body:`I received an email alert about a login from an IP address in Europe. I live in US. Someone logged into my account, changed my nickname, and spent 800 of my saved coins! Please lock my account and restore my coins immediately!`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.83,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Account security / compromise alert | Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Account security / compromise alert | Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1061`,subject:`Refund for unlistened audiobook season`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-912270 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1084`,subject:`VIP membership inactive on my account`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.46,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.46 < 0.60) | Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.46 < 0.60) | Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1154`,subject:`Downloaded episodes won't play offline`,body:`Downloads get stuck at 99% and fail with code ERR_STORAGE_WRITE. Device has over 30GB free storage available.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.29,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.29 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.29 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1101`,subject:`Payment went through but no coins received (Order #ORD-440131)`,body:`Hey support, I bought 500 coins for $9.99. Receipt #ORD-440131 received, but coins haven't shown up after restarting the app. User ID: USR-87397.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1143`,subject:`Crash when opening 'My Library' tab`,body:`The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1091`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1125`,subject:`VIP membership inactive on my account`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.46,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.46 < 0.60) | Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.46 < 0.60) | Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1046`,subject:`Charged twice for 500 Coin Pack`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-345884. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1194`,subject:`Feedback on narrator for 'Vampire Prince'`,body:`Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.66,sentiment:`Positive`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1135`,subject:`App crashes immediately on launch`,body:`Crash report: app crashes every time I try to play Episode 10 of any series.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1031`,subject:`Fraudulent charge from PocketToons`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1059`,subject:`Requesting refund for Order #ORD-630538`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-630538 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1196`,subject:`Great voice actor choice!`,body:`The new voice actor for Season 2 of 'Reborn Legend' sounds very monotone compared to Season 1. Please consider bringing back the original voice cast!`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.78,sentiment:`Positive`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1195`,subject:`Feature request: Playback speed control 2.5x`,body:`Great app! It would be amazing if you could add a Sleep Timer feature (15m, 30m, end of episode) so I can listen to audiobooks before sleeping without wasting battery.`,predicted_category:`Feedback & General`,predicted_subcategory:`App UI / UX Suggestion`,confidence_score:.78,sentiment:`Positive`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1170`,subject:`SMS verification failed for phone number`,body:`I'm trying to log in using my phone number, but the 6-digit OTP SMS code is never delivered to my phone. I tried 5 times. Please help me log in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1003`,subject:`App Store charged me two times for VIP monthly pass`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-612340. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1139`,subject:`Downloaded episodes won't play offline`,body:`Downloads get stuck at 99% and fail with code ERR_STORAGE_WRITE. Device has over 30GB free storage available.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.29,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.29 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.29 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1180`,subject:`Remove my personal info from your servers`,body:`Under GDPR / CCPA regulations, I hereby request the permanent deletion of my PocketToons account (User ID: USR-57447) and all associated personal data from your systems.`,predicted_category:`Account & Security`,predicted_subcategory:`Account Deletion Request`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1106`,subject:`Paid coins to unlock show but it asks for coins again`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1060`,subject:`Charged after cancelling VIP membership`,body:`Please cancel my subscription immediately and send confirmation to my email. I do not want auto-renew enabled.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1066`,subject:`Refund for unlistened audiobook season`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-524045 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1190`,subject:`Audio volume balance between voice and background music`,body:`Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.28,sentiment:`Positive`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.28 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.28 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1115`,subject:`VIP status lost after app update`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.12.0, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1098`,subject:`Paid coins to unlock show but it asks for coins again`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1025`,subject:`Subscription cancellation button not working`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Subscription Cancellation Issue`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thanks for reaching out to PocketToons. We're sorry to see you go!

We have verified your account and stopped any future recurring auto-renewals for your subscription. You will continue to have full access to your VIP privileges until the end of your current billing cycle.

You can also manage your subscriptions directly via your device settings:
• iOS: Settings > Apple ID > Subscriptions > PocketToons
• Android: Play Store > Profile > Payments & subscriptions > Subscriptions

Let us know if you need anything else!

Warm regards,
PocketToons Customer Care`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1150`,subject:`Buffering error on episode playback`,body:`Audio cuts out when my phone screen turns off. Background playback is broken on app version v3.12.1.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.85,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1093`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1074`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1042`,subject:`How to stop recurring billing?`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1105`,subject:`Paid coins to unlock show but it asks for coins again`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1171`,subject:`Unrecognized device login from another country`,body:`I received an email alert about a login from an IP address in Europe. I live in US. Someone logged into my account, changed my nickname, and spent 800 of my saved coins! Please lock my account and restore my coins immediately!`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.8,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1185`,subject:`Urgently help - someone hacked my account!`,body:`I received an email alert about a login from an IP address in Europe. I live in US. Someone logged into my account, changed my nickname, and spent 800 of my saved coins! Please lock my account and restore my coins immediately!`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.87,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Account security / compromise alert | Category 'Account & Security' requires human agent review | Category escalation trigger ('hacked') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Account security / compromise alert | Category 'Account & Security' requires human agent review | Category escalation trigger ('hacked') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1121`,subject:`Purchased annual VIP pass but still seeing ads and paywalls`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1131`,subject:`App crashes immediately on launch`,body:`Ever since updating to v3.12.0, the PocketToons app crashes immediately to the home screen upon launch. I cleared cache and reinstalled but issue persists on iPad Air (iOS 17.2).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1166`,subject:`App freeze during coin checkout`,body:`The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1079`,subject:`Purchased annual VIP pass but still seeing ads and paywalls`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1111`,subject:`Episode 25 locked despite using 10 coins`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1050`,subject:`Requesting refund for Order #ORD-609232`,body:`The audio quality of the series 'The Billionaire's Secret' is unlistenable and muffled. I want a refund of the $9.99 VIP pass I bought 2 hours ago.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Refund Request`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Support regarding your refund request.

We understand accidental purchases can happen. We have logged your request. If this purchase was made within the last 14 days and the coin balance/content remains unused, our billing system will automatically process a full refund to your original payment method within 24-48 hours.

Please confirm your Order ID if you haven't attached it yet so we can expedite your processing.

Best regards,
PocketToons Billing Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1122`,subject:`Purchased annual VIP pass but still seeing ads and paywalls`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.12.1, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1038`,subject:`Double billing issue on order ORD-400850`,body:`Hello team, I was charged twice for the monthly VIP pass ($14.99 x 2). I only pressed subscribe once. Please reverse the duplicate payment immediately.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Double Billing`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1007`,subject:`Refund request for accidental purchase`,body:`My 6-year-old toddler tapped the screen and accidentally bought the 2000 coins pack for $29.99. None of the coins have been used yet. Can you please process a refund?`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Refund Request`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Support regarding your refund request.

We understand accidental purchases can happen. We have logged your request. If this purchase was made within the last 14 days and the coin balance/content remains unused, our billing system will automatically process a full refund to your original payment method within 24-48 hours.

Please confirm your Order ID if you haven't attached it yet so we can expedite your processing.

Best regards,
PocketToons Billing Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1013`,subject:`Duplicate charge on my credit card receipt #ORD-783823`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-783823. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1182`,subject:`Permanently close my PocketToons account`,body:`Under GDPR / CCPA regulations, I hereby request the permanent deletion of my PocketToons account (User ID: USR-62350) and all associated personal data from your systems.`,predicted_category:`Account & Security`,predicted_subcategory:`Account Deletion Request`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Regulatory compliance / Data deletion request | Category 'Account & Security' requires human agent review | Category escalation trigger ('gdpr')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1064`,subject:`Need refund for coin pack - child purchased by mistake`,body:`The audio quality of the series 'The Billionaire's Secret' is unlistenable and muffled. I want a refund of the $9.99 VIP pass I bought 2 hours ago.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1116`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1069`,subject:`Fraudulent charge from PocketToons`,body:`I noticed a charge of $49.99 from PocketToons on my credit card today. I cancelled my subscription last month! This is an unauthorized charge. Refund me now or I will file a bank chargeback.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Category escalation trigger ('chargeback') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category escalation trigger ('chargeback') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1032`,subject:`Refund request for accidental purchase`,body:`My 6-year-old toddler tapped the screen and accidentally bought the 2000 coins pack for $29.99. None of the coins have been used yet. Can you please process a refund?`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Refund Request`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Support regarding your refund request.

We understand accidental purchases can happen. We have logged your request. If this purchase was made within the last 14 days and the coin balance/content remains unused, our billing system will automatically process a full refund to your original payment method within 24-48 hours.

Please confirm your Order ID if you haven't attached it yet so we can expedite your processing.

Best regards,
PocketToons Billing Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1120`,subject:`VIP membership inactive on my account`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.12.0, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1062`,subject:`App Store charged me two times for VIP monthly pass`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-572700. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1141`,subject:`Audio speeds up and sounds robot-like`,body:`Whenever I play any audio show, the track plays 5 seconds then buffers endlessly. My internet connection is fast (100 Mbps). Device: iPhone 14 Pro (iOS 17.4).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1028`,subject:`Unauthorized auto-renewal after cancellation`,body:`I noticed a charge of $49.99 from PocketToons on my credit card today. I cancelled my subscription last month! This is an unauthorized charge. Refund me now or I will file a bank chargeback.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Category escalation trigger ('chargeback') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category escalation trigger ('chargeback') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1132`,subject:`Audio keeps pausing every 5 seconds`,body:`The audio player pitch is distorted and plays at 2x speed automatically even when 1x is selected. Please fix this player bug.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1095`,subject:`Restore purchase not working for VIP pass`,body:`Paid $49.99 for yearly VIP membership. Order #ORD-344907. Still showing lock icons on exclusive episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1034`,subject:`Cannot cancel monthly subscription`,body:`Please cancel my subscription immediately and send confirmation to my email. I do not want auto-renew enabled.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Subscription Cancellation Issue`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thanks for reaching out to PocketToons. We're sorry to see you go!

We have verified your account and stopped any future recurring auto-renewals for your subscription. You will continue to have full access to your VIP privileges until the end of your current billing cycle.

You can also manage your subscriptions directly via your device settings:
• iOS: Settings > Apple ID > Subscriptions > PocketToons
• Android: Play Store > Profile > Payments & subscriptions > Subscriptions

Let us know if you need anything else!

Warm regards,
PocketToons Customer Care`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1103`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1200`,subject:`Great voice actor choice!`,body:`Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.56,sentiment:`Positive`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.56 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.56 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1082`,subject:`VIP membership inactive on my account`,body:`Paid $49.99 for yearly VIP membership. Order #ORD-127121. Still showing lock icons on exclusive episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.41,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.41 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.41 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1081`,subject:`Episode 25 locked despite using 10 coins`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1037`,subject:`Fraudulent charge from PocketToons`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1088`,subject:`Purchased annual VIP pass but still seeing ads and paywalls`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1053`,subject:`Refund for unlistened audiobook season`,body:`My 6-year-old toddler tapped the screen and accidentally bought the 2000 coins pack for $29.99. None of the coins have been used yet. Can you please process a refund?`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1119`,subject:`VIP status lost after app update`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.42,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.42 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.42 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1157`,subject:`PocketToons keeps stopping on Xiaomi Redmi Note 12 (Android 13)`,body:`The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1164`,subject:`Audio keeps pausing every 5 seconds`,body:`The audio player pitch is distorted and plays at 2x speed automatically even when 1x is selected. Please fix this player bug.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1113`,subject:`VIP membership inactive on my account`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.11.8, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1041`,subject:`Unauthorized auto-renewal after cancellation`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-740967.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1016`,subject:`Charged twice for 500 Coin Pack`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-871476. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1019`,subject:`Refund for unlistened audiobook season`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-314181 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1117`,subject:`Episode unlock error on 'CEO's Hidden Heiress'`,body:`Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1077`,subject:`Paid coins to unlock show but it asks for coins again`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1104`,subject:`Coins deducted but episode won't play`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1063`,subject:`Refund for unlistened audiobook season`,body:`I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #ORD-611233 so I can buy the correct one.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1124`,subject:`Missing coin purchase`,body:`Hey support, I bought 500 coins for $9.99. Receipt #ORD-651640 received, but coins haven't shown up after restarting the app. User ID: USR-75435.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Show Missing`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Content Team.

We have refreshed your account library permissions. Please log out and back in to see your updated content.

Warm regards,
PocketToons Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1189`,subject:`Suggestion for narrator sound quality`,body:`Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance.`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.78,sentiment:`Positive`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1075`,subject:`Coins deducted but episode won't play`,body:`Coins were deducted twice for unlocking the same episode! Check my transaction history.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

We apologize for the glitch with your unlocked episode!

We have refreshed your content access tokens on our server for your account. Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. You should now be able to play all unlocked episodes smoothly without any extra coin deductions.

Happy listening!
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1140`,subject:`Error downloading episode for offline listening`,body:`I downloaded 20 episodes for my flight, but when I turned on Airplane Mode, the app says 'No internet connection' and won't play offline files. What's the point of offline mode?`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Offline Download Failed`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1128`,subject:`Restore purchase not working for VIP pass`,body:`I paid for the Annual VIP Pass last month. Today after updating to v3.11.8, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1172`,subject:`OTP SMS code not arriving`,body:`I'm trying to log in using my phone number, but the 6-digit OTP SMS code is never delivered to my phone. I tried 5 times. Please help me log in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1159`,subject:`Downloaded episodes won't play offline`,body:`Downloaded files disappeared from my library after signing out and signing back in.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.29,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.29 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.29 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1107`,subject:`Paid coins to unlock show but it asks for coins again`,body:`I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1147`,subject:`Playback stops continuously on Wi-Fi`,body:`Audio cuts out when my phone screen turns off. Background playback is broken on app version v3.12.1.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Background Playback Issue`,confidence_score:.85,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1054`,subject:`Charged twice for 500 Coin Pack`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-154615. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1068`,subject:`Refund request for accidental purchase`,body:`The audio quality of the series 'The Billionaire's Secret' is unlistenable and muffled. I want a refund of the $9.99 VIP pass I bought 2 hours ago.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Refund Request`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Support regarding your refund request.

We understand accidental purchases can happen. We have logged your request. If this purchase was made within the last 14 days and the coin balance/content remains unused, our billing system will automatically process a full refund to your original payment method within 24-48 hours.

Please confirm your Order ID if you haven't attached it yet so we can expedite your processing.

Best regards,
PocketToons Billing Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1148`,subject:`Crash when opening 'My Library' tab`,body:`Ever since updating to v3.12.1, the PocketToons app crashes immediately to the home screen upon launch. I cleared cache and reinstalled but issue persists on Pixel 8 (Android 14).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1184`,subject:`Urgently help - someone hacked my account!`,body:`Urgent: Unauthorized password change notification received. I did not request this. Freeze my account to prevent fraud!`,predicted_category:`Account & Security`,predicted_subcategory:`Suspicious Activity / Hacked Account`,confidence_score:.87,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Account security / compromise alert | Category 'Account & Security' requires human agent review | Category escalation trigger ('hacked') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Account security / compromise alert | Category 'Account & Security' requires human agent review | Category escalation trigger ('hacked') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1012`,subject:`Charged after cancelling VIP membership`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1197`,subject:`Suggestion for narrator sound quality`,body:`The new voice actor for Season 2 of 'Reborn Legend' sounds very monotone compared to Season 1. Please consider bringing back the original voice cast!`,predicted_category:`Feedback & General`,predicted_subcategory:`Narrator Voice Feedback`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you so much for taking the time to share your feedback with PocketToons!

We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.

Thanks for being a valued part of our community!

Warmly,
PocketToons Product Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1008`,subject:`Fraudulent charge from PocketToons`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-132938.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1011`,subject:`Duplicate charge on my credit card receipt #ORD-522179`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-522179. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1145`,subject:`App freeze during coin checkout`,body:`Crash report: app crashes every time I try to play Episode 10 of any series.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1087`,subject:`VIP membership inactive on my account`,body:`Paid $49.99 for yearly VIP membership. Order #ORD-584417. Still showing lock icons on exclusive episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.41,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.41 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.41 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1155`,subject:`Downloaded episodes won't play offline`,body:`Downloads get stuck at 99% and fail with code ERR_STORAGE_WRITE. Device has over 30GB free storage available.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Episode Locked After Unlock`,confidence_score:.29,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.29 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.29 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1160`,subject:`App crashes immediately on launch`,body:`The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1169`,subject:`SMS verification failed for phone number`,body:`Changed my phone number and now I can't access my old account with 1500 purchased coins. How can I transfer my account?`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1183`,subject:`SMS verification failed for phone number`,body:`Changed my phone number and now I can't access my old account with 1500 purchased coins. How can I transfer my account?`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1040`,subject:`Duplicate charge on my credit card receipt #ORD-805477`,body:`Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: ORD-805477. Please refund the extra $9.99.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1149`,subject:`Error downloading episode for offline listening`,body:`Downloaded files disappeared from my library after signing out and signing back in.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Offline Download Failed`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1152`,subject:`Audio keeps pausing every 5 seconds`,body:`The audio player pitch is distorted and plays at 2x speed automatically even when 1x is selected. Please fix this player bug.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1044`,subject:`Need refund for coin pack - child purchased by mistake`,body:`The audio quality of the series 'The Billionaire's Secret' is unlistenable and muffled. I want a refund of the $9.99 VIP pass I bought 2 hours ago.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1165`,subject:`Download stuck at 99%`,body:`Downloaded files disappeared from my library after signing out and signing back in.`,predicted_category:`Account & Security`,predicted_subcategory:`Cannot Login / OTP Fail`,confidence_score:.31,sentiment:`Negative`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.31 < 0.60) | Category 'Account & Security' requires human agent review`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.31 < 0.60) | Category 'Account & Security' requires human agent review

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1129`,subject:`Purchased annual VIP pass but still seeing ads and paywalls`,body:`My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for contacting PocketToons Support.

We've resynced your VIP subscription status across our servers. Please tap 'Restore Purchases' in the App Settings menu to reactivate your VIP perks on this device.

If you continue experiencing issues, please verify that you are logged into the same account used during purchase.

Best regards,
PocketToons VIP Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1024`,subject:`Refund for unlistened audiobook season`,body:`My 6-year-old toddler tapped the screen and accidentally bought the 2000 coins pack for $29.99. None of the coins have been used yet. Can you please process a refund?`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1137`,subject:`Audio keeps pausing every 5 seconds`,body:`Whenever I play any audio show, the track plays 5 seconds then buffers endlessly. My internet connection is fast (100 Mbps). Device: iPad Air (iOS 17.2).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1158`,subject:`App crashes immediately on launch`,body:`The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1078`,subject:`Coins not added after successful payment`,body:`Payment was successful on Google Play but the app threw an error 'Transaction Pending' and my coins are missing. Please help credit them.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1161`,subject:`PocketToons keeps stopping on Samsung Galaxy S23 (Android 14)`,body:`Ever since updating to v3.12.0, the PocketToons app crashes immediately to the home screen upon launch. I cleared cache and reinstalled but issue persists on Samsung Galaxy S23 (Android 14).`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.78,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue')`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue')

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1033`,subject:`Fraudulent charge from PocketToons`,body:`I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID ORD-378361.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('attorney') | Category escalation trigger ('attorney') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1071`,subject:`Coins not added after successful payment`,body:`I purchased the $14.99 coin pack 30 minutes ago via Apple Pay. Money was deducted from my account (Order #ORD-406327), but my in-app coin wallet still shows 0. Please credit my coins!`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1142`,subject:`Crash when opening 'My Library' tab`,body:`The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`App Crash`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1163`,subject:`Buffering error on episode playback`,body:`Audio cuts out when my phone screen turns off. Background playback is broken on app version v3.12.0.`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Audio Stutter / Buffering`,confidence_score:.85,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1051`,subject:`Cannot cancel monthly subscription`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Subscription Cancellation Issue`,confidence_score:.95,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thanks for reaching out to PocketToons. We're sorry to see you go!

We have verified your account and stopped any future recurring auto-renewals for your subscription. You will continue to have full access to your VIP privileges until the end of your current billing cycle.

You can also manage your subscriptions directly via your device settings:
• iOS: Settings > Apple ID > Subscriptions > PocketToons
• Android: Play Store > Profile > Payments & subscriptions > Subscriptions

Let us know if you need anything else!

Warm regards,
PocketToons Customer Care`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1065`,subject:`How to stop recurring billing?`,body:`I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reaching out to PocketToons Billing Support.

We have received your billing query. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.

Thank you for your patience,
PocketToons Support Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1021`,subject:`Unauthorized auto-renewal after cancellation`,body:`My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.`,predicted_category:`Billing & Refunds`,predicted_subcategory:`Unauthorized Charge`,confidence_score:.95,sentiment:`Severe/Frustrated`,escalate_to_human:!0,escalation_reason:`Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Legal/Regulatory escalation trigger ('sue') | Category escalation trigger ('fraud') | Severe frustration on high-priority category

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1073`,subject:`Purchased 1000 coins but balance is still 0`,body:`I purchased the $14.99 coin pack 30 minutes ago via Apple Pay. Money was deducted from my account (Order #ORD-520172), but my in-app coin wallet still shows 0. Please credit my coins!`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.87,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention! We apologize for the delay in crediting your purchased coins.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please send us your Store Receipt Number and we will manually credit your account.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1133`,subject:`Error downloading episode for offline listening`,body:`I downloaded 20 episodes for my flight, but when I turned on Airplane Mode, the app says 'No internet connection' and won't play offline files. What's the point of offline mode?`,predicted_category:`Technical & Playback Bugs`,predicted_subcategory:`Offline Download Failed`,confidence_score:.87,sentiment:`Negative`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for reporting this playback issue to PocketToons Engineering.

We recommend attempting the following troubleshooting steps:
1. Ensure your app is updated to the latest version in App Store / Play Store.
2. Go to Settings > Storage & Cache > Clear Cache.
3. Toggle Airplane Mode ON for 5 seconds and back OFF.

Our tech team has logged your device details for further diagnostics.

Best regards,
PocketToons Tech Support`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1089`,subject:`VIP membership inactive on my account`,body:`Paid $49.99 for yearly VIP membership. Order #ORD-227324. Still showing lock icons on exclusive episodes.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`VIP Membership Missing`,confidence_score:.41,sentiment:`Neutral`,escalate_to_human:!0,escalation_reason:`Low classifier confidence (0.41 < 0.60)`,suggested_reply:`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]
Reason for Escalation: Low classifier confidence (0.41 < 0.60)

Hello,
Thank you for reaching out to PocketToons Support. Your request has been escalated to a senior support specialist for priority review. A team member will inspect your account details and follow up with you within 2-4 hours.

Best regards,
PocketToons Tier 2 Escalations Team`,extracted_entities:{},classification_reasoning:null,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`},{ticket_id:`TCK-1201`,subject:`testing 123`,body:`Hi i bought the coins but not received it.`,predicted_category:`Content Access & Coins`,predicted_subcategory:`Coins Not Credited`,confidence_score:.78,sentiment:`Neutral`,escalate_to_human:!1,escalation_reason:null,suggested_reply:`Hello,

Thank you for bringing this to our attention!

We apologize for the delay in crediting your purchased None to your wallet under None for your transaction.

To immediately sync your coin wallet, please try the following steps:
1. Force-close the PocketToons app and re-open it.
2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.

Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please reply directly to this email.

Best regards,
PocketToons Content Team`,extracted_entities:{},classification_reasoning:`Derived from local hybrid ML & keyword mapping.`,used_llm_classifier:!1,device_info:`Unknown Device`,app_version:`Unknown Version`}],x={app_name:`PocketToons`,version:`1.0`,categories:[{id:`billing_and_refunds`,name:`Billing & Refunds`,description:`Payment issues, accidental charges, refund requests, double billing, auto-renewal cancellations, or invoice disputes.`,subcategories:[`Unauthorized Charge`,`Double Billing`,`Refund Request`,`Subscription Cancellation Issue`,`Payment Method Failed`],keywords:[`charged`,`refund`,`double billed`,`apple pay`,`google play`,`credit card`,`bank`,`unauthorized`,`subscription`,`cancel`,`money back`,`receipt`,`overcharged`,`invoice`],priority:`HIGH`,auto_reply_eligible:!0,escalation_triggers:[`chargeback`,`lawyer`,`attorney`,`unauthorized transaction over 50`,`bank dispute`,`fraud`]},{id:`content_access_and_coins`,name:`Content Access & Coins`,description:`Purchased coins not showing up, episodes remaining locked after spending coins, VIP pass not active, missing unlocked audiobooks/shows.`,subcategories:[`Coins Not Credited`,`Episode Locked After Unlock`,`VIP Membership Missing`,`Show Missing`,`Content Sync Error`],keywords:[`coins`,`unlocked`,`episode locked`,`purchased coins`,`coin pack`,`vip pass`,`locked`,`missing episode`,`spent coins`,`audiobook access`,`microtransaction`,`redeem code`],priority:`MEDIUM`,auto_reply_eligible:!0,escalation_triggers:[`lost 1000+ coins`,`lost all my purchases`,`vip paid but expired early`]},{id:`technical_and_playback_bugs`,name:`Technical & Playback Bugs`,description:`App crashes, audio buffering, player freezing, offline download failures, background audio stops, Bluetooth/CarPlay glitches.`,subcategories:[`App Crash`,`Audio Stutter / Buffering`,`Offline Download Failed`,`Background Playback Issue`,`CarPlay / Bluetooth Glitch`],keywords:[`crash`,`buffer`,`stutter`,`freeze`,`downloading`,`offline mode`,`playback error`,`black screen`,`silent audio`,`carplay`,`bluetooth`,`glitch`,`bug`,`app stopped`],priority:`MEDIUM`,auto_reply_eligible:!0,escalation_triggers:[`app crashes on startup continuously`,`device overheating`,`data corruption`]},{id:`account_and_security`,name:`Account & Security`,description:`Login problems, OTP verification failures, password resets, account deletion / GDPR requests, suspicious login activity.`,subcategories:[`Cannot Login / OTP Fail`,`Password Reset Issue`,`Suspicious Activity / Hacked Account`,`Account Deletion Request`,`Profile Data Sync`],keywords:[`login`,`otp`,`password`,`sign in`,`hacked`,`stolen`,`unauthorized access`,`delete account`,`gdpr`,`email change`,`logged out`,`verification code`],priority:`HIGH`,auto_reply_eligible:!1,escalation_triggers:[`hacked`,`stolen account`,`unauthorized access`,`delete my account`,`gdpr`,`data erasure`,`identity theft`]},{id:`feedback_and_general`,name:`Feedback & General`,description:`Feature suggestions, narrator voice reviews, content recommendations, app UI praise or critique, pricing thoughts.`,subcategories:[`Narrator Voice Feedback`,`App UI / UX Suggestion`,`Content Catalog Request`,`General Appreciation`,`Pricing Feedback`],keywords:[`love the app`,`suggestion`,`add new episodes`,`narrator voice`,`season 2`,`more content`,`great show`,`dark mode`,`feature request`,`ui improvement`],priority:`LOW`,auto_reply_eligible:!0,escalation_triggers:[]}],global_escalation_rules:{min_confidence_threshold:.6,legal_keywords:[`lawyer`,`attorney`,`lawsuit`,`sue`,`legal action`,`better business bureau`,`bbb`,`consumer protection`,`ftc`,`small claims`],abuse_keywords:[`scam`,`scammers`,`fraudulent company`,`thieves`,`stealing money`,`police report`],extreme_sentiment_threshold:-.8}},S={dataset:`data/gold_eval_dataset.json`,sample_size:25,overall_classification_metrics:{accuracy:.92,macro_precision:.95,macro_recall:.9333,macro_f1:.9314,weighted_f1:.9177},escalation_metrics:{escalation_accuracy:.76,escalation_precision:.375,escalation_recall:.75,escalation_f1:.5},per_category_metrics:{"Billing & Refunds":{precision:1,recall:.6667,f1_score:.8,support:6},"Content Access & Coins":{precision:.75,recall:1,f1_score:.8571,support:6},"Technical & Playback Bugs":{precision:1,recall:1,f1_score:1,support:5},"Account & Security":{precision:1,recall:1,f1_score:1,support:5},"Feedback & General":{precision:1,recall:1,f1_score:1,support:3}},confusion_matrix:{labels:[`Billing & Refunds`,`Content Access & Coins`,`Technical & Playback Bugs`,`Account & Security`,`Feedback & General`],matrix:[[4,2,0,0,0],[0,6,0,0,0],[0,0,5,0,0],[0,0,0,5,0],[0,0,0,0,3]]}},C=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),w=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),te=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),ne=e=>{let t=te(e);return t.charAt(0).toUpperCase()+t.slice(1)},T={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},re=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},ie=(0,b.forwardRef)(({color:e=`currentColor`,size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>(0,b.createElement)(`svg`,{ref:c,...T,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:C(`lucide`,i),...!a&&!re(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,b.createElement)(e,t)),...Array.isArray(a)?a:[a]])),E=(e,t)=>{let n=(0,b.forwardRef)(({className:n,...r},i)=>(0,b.createElement)(ie,{ref:i,iconNode:t,className:C(`lucide-${w(ne(e))}`,`lucide-${e}`,n),...r}));return n.displayName=ne(e),n},D=E(`chart-column`,[[`path`,{d:`M3 3v16a2 2 0 0 0 2 2h16`,key:`c24i48`}],[`path`,{d:`M18 17V9`,key:`2bz60n`}],[`path`,{d:`M13 17V5`,key:`1frdt8`}],[`path`,{d:`M8 17v-3`,key:`17ska0`}]]),O=E(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),ae=E(`chevron-left`,[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]),oe=E(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),k=E(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),se=E(`flask-conical`,[[`path`,{d:`M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2`,key:`18mbvz`}],[`path`,{d:`M6.453 15h11.094`,key:`3shlmq`}],[`path`,{d:`M8.5 2h7`,key:`csnxdl`}]]),ce=E(`headphones`,[[`path`,{d:`M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3`,key:`1xhozi`}]]),le=E(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),ue=E(`layout-dashboard`,[[`rect`,{width:`7`,height:`9`,x:`3`,y:`3`,rx:`1`,key:`10lvy0`}],[`rect`,{width:`7`,height:`5`,x:`14`,y:`3`,rx:`1`,key:`16une8`}],[`rect`,{width:`7`,height:`9`,x:`14`,y:`12`,rx:`1`,key:`1hutg5`}],[`rect`,{width:`7`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`ldoo1y`}]]),A=E(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),j=E(`settings`,[[`path`,{d:`M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,key:`1i5ecw`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]),de=E(`upload`,[[`path`,{d:`M12 3v12`,key:`1x0j5s`}],[`path`,{d:`m17 8-5-5-5 5`,key:`7q97r8`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,key:`ih7n3h`}]]);function fe(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=fe(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function M(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=fe(e))&&(r&&(r+=` `),r+=t);return r}var pe=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},N=(e,t)=>({classGroupId:e,validator:t}),P=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),F=`-`,I=[],me=`arbitrary..`,he=e=>{let t=ve(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return _e(e);let n=e.split(F);return ge(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?pe(i,t):t:i||I}return n[e]||I}}},ge=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=ge(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(F):e.slice(t).join(F),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},_e=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?me+r:void 0})(),ve=e=>{let{theme:t,classGroups:n}=e;return ye(n,t)},ye=(e,t)=>{let n=P();for(let r in e){let i=e[r];be(i,n,r,t)}return n},be=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];xe(i,t,n,r)}},xe=(e,t,n,r)=>{if(typeof e==`string`){Se(e,t,n);return}if(typeof e==`function`){Ce(e,t,n,r);return}we(e,t,n,r)},Se=(e,t,n)=>{let r=e===``?t:Te(t,e);r.classGroupId=n},Ce=(e,t,n,r)=>{if(Ee(e)){be(e(r),t,n,r);return}t.validators===null&&(t.validators=[]),t.validators.push(N(n,e))},we=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];be(o,Te(t,a),n,r)}},Te=(e,t)=>{let n=e,r=t.split(F),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=P(),n.nextPart.set(t,i)),n=i}return n},Ee=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,De=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},Oe=`!`,ke=`:`,Ae=[],je=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),Me=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let o=e[s];if(n===0&&r===0){if(o===ke){t.push(e.slice(i,s)),i=s+1;continue}if(o===`/`){a=s;continue}}o===`[`?n++:o===`]`?n--:o===`(`?r++:o===`)`&&r--}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(Oe)?(c=s.slice(0,-1),l=!0):s.startsWith(Oe)&&(c=s.slice(1),l=!0);let u=a&&a>i?a-i:void 0;return je(t,l,c,u)};if(t){let e=t+ke,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):je(Ae,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},Ne=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},Pe=e=>({cache:De(e.cacheSize),parseClassName:Me(e),sortModifiers:Ne(e),postfixLookupClassGroupIds:Fe(e),...he(e)}),Fe=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},Ie=/\s+/,Le=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(Ie),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h){l=t+(l.length>0?` `+l:l);continue}if(g=r(p),!g){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+Oe:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},Re=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=ze(n))&&(i&&(i+=` `),i+=r);return i},ze=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=ze(e[r]))&&(n&&(n+=` `),n+=t);return n},Be=(e,...t)=>{let n,r,i,a,o=o=>(n=Pe(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=Le(e,n);return i(e,a),a};return a=o,(...e)=>a(Re(...e))},Ve=[],L=e=>{let t=t=>t[e]||Ve;return t.isThemeGetter=!0,t},He=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Ue=/^\((?:(\w[\w-]*):)?(.+)\)$/i,We=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,Ge=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ke=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,qe=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Je=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ye=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,R=e=>We.test(e),z=e=>!!e&&!Number.isNaN(Number(e)),B=e=>!!e&&Number.isInteger(Number(e)),Xe=e=>e.endsWith(`%`)&&z(e.slice(0,-1)),V=e=>Ge.test(e),Ze=()=>!0,Qe=e=>Ke.test(e)&&!qe.test(e),$e=()=>!1,et=e=>Je.test(e),tt=e=>Ye.test(e),nt=e=>!H(e)&&!W(e),rt=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),it=e=>G(e,bt,$e),H=e=>He.test(e),U=e=>G(e,xt,Qe),at=e=>G(e,St,z),ot=e=>G(e,wt,Ze),st=e=>G(e,Ct,$e),ct=e=>G(e,vt,$e),lt=e=>G(e,yt,tt),ut=e=>G(e,Tt,et),W=e=>Ue.test(e),dt=e=>K(e,xt),ft=e=>K(e,Ct),pt=e=>K(e,vt),mt=e=>K(e,bt),ht=e=>K(e,yt),gt=e=>K(e,Tt,!0),_t=e=>K(e,wt,!0),G=(e,t,n)=>{let r=He.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},K=(e,t,n=!1)=>{let r=Ue.exec(e);return r?r[1]?t(r[1]):n:!1},vt=e=>e===`position`||e===`percentage`,yt=e=>e===`image`||e===`url`,bt=e=>e===`length`||e===`size`||e===`bg-size`,xt=e=>e===`length`,St=e=>e===`number`,Ct=e=>e===`family-name`,wt=e=>e===`number`||e===`weight`,Tt=e=>e===`shadow`,Et=Be(()=>{let e=L(`color`),t=L(`font`),n=L(`text`),r=L(`font-weight`),i=L(`tracking`),a=L(`leading`),o=L(`breakpoint`),s=L(`container`),c=L(`spacing`),l=L(`radius`),u=L(`shadow`),d=L(`inset-shadow`),f=L(`text-shadow`),p=L(`drop-shadow`),m=L(`blur`),h=L(`perspective`),g=L(`aspect`),_=L(`ease`),v=L(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],ee=()=>[...b(),W,H],x=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],S=()=>[`auto`,`contain`,`none`],C=()=>[W,H,c],w=()=>[R,`full`,`auto`,...C()],te=()=>[B,`none`,`subgrid`,W,H],ne=()=>[`auto`,{span:[`full`,B,W,H]},B,W,H],T=()=>[B,`auto`,W,H],re=()=>[`auto`,`min`,`max`,`fr`,W,H],ie=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],E=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],D=()=>[`auto`,...C()],O=()=>[R,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...C()],ae=()=>[R,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...C()],oe=()=>[R,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...C()],k=()=>[e,W,H],se=()=>[...b(),pt,ct,{position:[W,H]}],ce=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],le=()=>[`auto`,`cover`,`contain`,mt,it,{size:[W,H]}],ue=()=>[Xe,dt,U],A=()=>[``,`none`,`full`,l,W,H],j=()=>[``,z,dt,U],de=()=>[`solid`,`dashed`,`dotted`,`double`],fe=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],M=()=>[z,Xe,pt,ct],pe=()=>[``,`none`,m,W,H],N=()=>[`none`,z,W,H],P=()=>[`none`,z,W,H],F=()=>[z,W,H],I=()=>[R,`full`,...C()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[V],breakpoint:[V],color:[Ze],container:[V],"drop-shadow":[V],ease:[`in`,`out`,`in-out`],font:[nt],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[V],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[V],shadow:[V],spacing:[`px`,z],text:[V],"text-shadow":[V],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,R,H,W,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,W,H]}],"container-named":[rt],columns:[{columns:[z,H,W,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`,`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:ee()}],overflow:[{overflow:x()}],"overflow-x":[{"overflow-x":x()}],"overflow-y":[{"overflow-y":x()}],overscroll:[{overscroll:S()}],"overscroll-x":[{"overscroll-x":S()}],"overscroll-y":[{"overscroll-y":S()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:w()}],"inset-x":[{"inset-x":w()}],"inset-y":[{"inset-y":w()}],start:[{"inset-s":w(),start:w()}],end:[{"inset-e":w(),end:w()}],"inset-bs":[{"inset-bs":w()}],"inset-be":[{"inset-be":w()}],top:[{top:w()}],right:[{right:w()}],bottom:[{bottom:w()}],left:[{left:w()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[B,`auto`,W,H]}],basis:[{basis:[R,`full`,`auto`,s,...C()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[z,R,`auto`,`initial`,`none`,H]}],grow:[{grow:[``,z,W,H]}],shrink:[{shrink:[``,z,W,H]}],order:[{order:[B,`first`,`last`,`none`,W,H]}],"grid-cols":[{"grid-cols":te()}],"col-start-end":[{col:ne()}],"col-start":[{"col-start":T()}],"col-end":[{"col-end":T()}],"grid-rows":[{"grid-rows":te()}],"row-start-end":[{row:ne()}],"row-start":[{"row-start":T()}],"row-end":[{"row-end":T()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":re()}],"auto-rows":[{"auto-rows":re()}],gap:[{gap:C()}],"gap-x":[{"gap-x":C()}],"gap-y":[{"gap-y":C()}],"justify-content":[{justify:[...ie(),`normal`]}],"justify-items":[{"justify-items":[...E(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...E()]}],"align-content":[{content:[`normal`,...ie()]}],"align-items":[{items:[...E(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...E(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":ie()}],"place-items":[{"place-items":[...E(),`baseline`]}],"place-self":[{"place-self":[`auto`,...E()]}],p:[{p:C()}],px:[{px:C()}],py:[{py:C()}],ps:[{ps:C()}],pe:[{pe:C()}],pbs:[{pbs:C()}],pbe:[{pbe:C()}],pt:[{pt:C()}],pr:[{pr:C()}],pb:[{pb:C()}],pl:[{pl:C()}],m:[{m:D()}],mx:[{mx:D()}],my:[{my:D()}],ms:[{ms:D()}],me:[{me:D()}],mbs:[{mbs:D()}],mbe:[{mbe:D()}],mt:[{mt:D()}],mr:[{mr:D()}],mb:[{mb:D()}],ml:[{ml:D()}],"space-x":[{"space-x":C()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":C()}],"space-y-reverse":[`space-y-reverse`],size:[{size:O()}],"inline-size":[{inline:[`auto`,...ae()]}],"min-inline-size":[{"min-inline":[`auto`,...ae()]}],"max-inline-size":[{"max-inline":[`none`,...ae()]}],"block-size":[{block:[`auto`,...oe()]}],"min-block-size":[{"min-block":[`auto`,...oe()]}],"max-block-size":[{"max-block":[`none`,...oe()]}],w:[{w:[s,`screen`,...O()]}],"min-w":[{"min-w":[s,`screen`,`none`,...O()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...O()]}],h:[{h:[`screen`,`lh`,...O()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...O()]}],"max-h":[{"max-h":[`screen`,`lh`,...O()]}],"font-size":[{text:[`base`,n,dt,U]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,_t,ot]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,Xe,H]}],"font-family":[{font:[ft,st,t]}],"font-features":[{"font-features":[H]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,W,H]}],"line-clamp":[{"line-clamp":[z,`none`,W,at]}],leading:[{leading:[a,...C()]}],"list-image":[{"list-image":[`none`,W,H]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,W,H]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:k()}],"text-color":[{text:k()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...de(),`wavy`]}],"text-decoration-thickness":[{decoration:[z,`from-font`,`auto`,W,U]}],"text-decoration-color":[{decoration:k()}],"underline-offset":[{"underline-offset":[z,`auto`,W,H]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:C()}],"tab-size":[{tab:[B,W,H]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,W,H]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,W,H]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:se()}],"bg-repeat":[{bg:ce()}],"bg-size":[{bg:le()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},B,W,H],radial:[``,W,H],conic:[B,W,H]},ht,lt]}],"bg-color":[{bg:k()}],"gradient-from-pos":[{from:ue()}],"gradient-via-pos":[{via:ue()}],"gradient-to-pos":[{to:ue()}],"gradient-from":[{from:k()}],"gradient-via":[{via:k()}],"gradient-to":[{to:k()}],rounded:[{rounded:A()}],"rounded-s":[{"rounded-s":A()}],"rounded-e":[{"rounded-e":A()}],"rounded-t":[{"rounded-t":A()}],"rounded-r":[{"rounded-r":A()}],"rounded-b":[{"rounded-b":A()}],"rounded-l":[{"rounded-l":A()}],"rounded-ss":[{"rounded-ss":A()}],"rounded-se":[{"rounded-se":A()}],"rounded-ee":[{"rounded-ee":A()}],"rounded-es":[{"rounded-es":A()}],"rounded-tl":[{"rounded-tl":A()}],"rounded-tr":[{"rounded-tr":A()}],"rounded-br":[{"rounded-br":A()}],"rounded-bl":[{"rounded-bl":A()}],"border-w":[{border:j()}],"border-w-x":[{"border-x":j()}],"border-w-y":[{"border-y":j()}],"border-w-s":[{"border-s":j()}],"border-w-e":[{"border-e":j()}],"border-w-bs":[{"border-bs":j()}],"border-w-be":[{"border-be":j()}],"border-w-t":[{"border-t":j()}],"border-w-r":[{"border-r":j()}],"border-w-b":[{"border-b":j()}],"border-w-l":[{"border-l":j()}],"divide-x":[{"divide-x":j()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":j()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...de(),`hidden`,`none`]}],"divide-style":[{divide:[...de(),`hidden`,`none`]}],"border-color":[{border:k()}],"border-color-x":[{"border-x":k()}],"border-color-y":[{"border-y":k()}],"border-color-s":[{"border-s":k()}],"border-color-e":[{"border-e":k()}],"border-color-bs":[{"border-bs":k()}],"border-color-be":[{"border-be":k()}],"border-color-t":[{"border-t":k()}],"border-color-r":[{"border-r":k()}],"border-color-b":[{"border-b":k()}],"border-color-l":[{"border-l":k()}],"divide-color":[{divide:k()}],"outline-style":[{outline:[...de(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[z,W,H]}],"outline-w":[{outline:[``,z,dt,U]}],"outline-color":[{outline:k()}],shadow:[{shadow:[``,`none`,u,gt,ut]}],"shadow-color":[{shadow:k()}],"inset-shadow":[{"inset-shadow":[`none`,d,gt,ut]}],"inset-shadow-color":[{"inset-shadow":k()}],"ring-w":[{ring:j()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:k()}],"ring-offset-w":[{"ring-offset":[z,U]}],"ring-offset-color":[{"ring-offset":k()}],"inset-ring-w":[{"inset-ring":j()}],"inset-ring-color":[{"inset-ring":k()}],"text-shadow":[{"text-shadow":[`none`,f,gt,ut]}],"text-shadow-color":[{"text-shadow":k()}],opacity:[{opacity:[z,W,H]}],"mix-blend":[{"mix-blend":[...fe(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":fe()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[z]}],"mask-image-linear-from-pos":[{"mask-linear-from":M()}],"mask-image-linear-to-pos":[{"mask-linear-to":M()}],"mask-image-linear-from-color":[{"mask-linear-from":k()}],"mask-image-linear-to-color":[{"mask-linear-to":k()}],"mask-image-t-from-pos":[{"mask-t-from":M()}],"mask-image-t-to-pos":[{"mask-t-to":M()}],"mask-image-t-from-color":[{"mask-t-from":k()}],"mask-image-t-to-color":[{"mask-t-to":k()}],"mask-image-r-from-pos":[{"mask-r-from":M()}],"mask-image-r-to-pos":[{"mask-r-to":M()}],"mask-image-r-from-color":[{"mask-r-from":k()}],"mask-image-r-to-color":[{"mask-r-to":k()}],"mask-image-b-from-pos":[{"mask-b-from":M()}],"mask-image-b-to-pos":[{"mask-b-to":M()}],"mask-image-b-from-color":[{"mask-b-from":k()}],"mask-image-b-to-color":[{"mask-b-to":k()}],"mask-image-l-from-pos":[{"mask-l-from":M()}],"mask-image-l-to-pos":[{"mask-l-to":M()}],"mask-image-l-from-color":[{"mask-l-from":k()}],"mask-image-l-to-color":[{"mask-l-to":k()}],"mask-image-x-from-pos":[{"mask-x-from":M()}],"mask-image-x-to-pos":[{"mask-x-to":M()}],"mask-image-x-from-color":[{"mask-x-from":k()}],"mask-image-x-to-color":[{"mask-x-to":k()}],"mask-image-y-from-pos":[{"mask-y-from":M()}],"mask-image-y-to-pos":[{"mask-y-to":M()}],"mask-image-y-from-color":[{"mask-y-from":k()}],"mask-image-y-to-color":[{"mask-y-to":k()}],"mask-image-radial":[{"mask-radial":[W,H]}],"mask-image-radial-from-pos":[{"mask-radial-from":M()}],"mask-image-radial-to-pos":[{"mask-radial-to":M()}],"mask-image-radial-from-color":[{"mask-radial-from":k()}],"mask-image-radial-to-color":[{"mask-radial-to":k()}],"mask-image-radial-shape":[{"mask-radial":[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[z]}],"mask-image-conic-from-pos":[{"mask-conic-from":M()}],"mask-image-conic-to-pos":[{"mask-conic-to":M()}],"mask-image-conic-from-color":[{"mask-conic-from":k()}],"mask-image-conic-to-color":[{"mask-conic-to":k()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:se()}],"mask-repeat":[{mask:ce()}],"mask-size":[{mask:le()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,W,H]}],filter:[{filter:[``,`none`,W,H]}],blur:[{blur:pe()}],brightness:[{brightness:[z,W,H]}],contrast:[{contrast:[z,W,H]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,gt,ut]}],"drop-shadow-color":[{"drop-shadow":k()}],grayscale:[{grayscale:[``,z,W,H]}],"hue-rotate":[{"hue-rotate":[z,W,H]}],invert:[{invert:[``,z,W,H]}],saturate:[{saturate:[z,W,H]}],sepia:[{sepia:[``,z,W,H]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,W,H]}],"backdrop-blur":[{"backdrop-blur":pe()}],"backdrop-brightness":[{"backdrop-brightness":[z,W,H]}],"backdrop-contrast":[{"backdrop-contrast":[z,W,H]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,z,W,H]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[z,W,H]}],"backdrop-invert":[{"backdrop-invert":[``,z,W,H]}],"backdrop-opacity":[{"backdrop-opacity":[z,W,H]}],"backdrop-saturate":[{"backdrop-saturate":[z,W,H]}],"backdrop-sepia":[{"backdrop-sepia":[``,z,W,H]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":C()}],"border-spacing-x":[{"border-spacing-x":C()}],"border-spacing-y":[{"border-spacing-y":C()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,W,H]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[z,`initial`,W,H]}],ease:[{ease:[`linear`,`initial`,_,W,H]}],delay:[{delay:[z,W,H]}],animate:[{animate:[`none`,v,W,H]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,W,H]}],"perspective-origin":[{"perspective-origin":ee()}],rotate:[{rotate:N()}],"rotate-x":[{"rotate-x":N()}],"rotate-y":[{"rotate-y":N()}],"rotate-z":[{"rotate-z":N()}],scale:[{scale:P()}],"scale-x":[{"scale-x":P()}],"scale-y":[{"scale-y":P()}],"scale-z":[{"scale-z":P()}],"scale-3d":[`scale-3d`],skew:[{skew:F()}],"skew-x":[{"skew-x":F()}],"skew-y":[{"skew-y":F()}],transform:[{transform:[W,H,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:ee()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:I()}],"translate-x":[{"translate-x":I()}],"translate-y":[{"translate-y":I()}],"translate-z":[{"translate-z":I()}],"translate-none":[`translate-none`],zoom:[{zoom:[B,W,H]}],accent:[{accent:k()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:k()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,W,H]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":k()}],"scrollbar-track-color":[{"scrollbar-track":k()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":C()}],"scroll-mx":[{"scroll-mx":C()}],"scroll-my":[{"scroll-my":C()}],"scroll-ms":[{"scroll-ms":C()}],"scroll-me":[{"scroll-me":C()}],"scroll-mbs":[{"scroll-mbs":C()}],"scroll-mbe":[{"scroll-mbe":C()}],"scroll-mt":[{"scroll-mt":C()}],"scroll-mr":[{"scroll-mr":C()}],"scroll-mb":[{"scroll-mb":C()}],"scroll-ml":[{"scroll-ml":C()}],"scroll-p":[{"scroll-p":C()}],"scroll-px":[{"scroll-px":C()}],"scroll-py":[{"scroll-py":C()}],"scroll-ps":[{"scroll-ps":C()}],"scroll-pe":[{"scroll-pe":C()}],"scroll-pbs":[{"scroll-pbs":C()}],"scroll-pbe":[{"scroll-pbe":C()}],"scroll-pt":[{"scroll-pt":C()}],"scroll-pr":[{"scroll-pr":C()}],"scroll-pb":[{"scroll-pb":C()}],"scroll-pl":[{"scroll-pl":C()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,W,H]}],fill:[{fill:[`none`,...k()]}],"stroke-w":[{stroke:[z,dt,U,at]}],stroke:[{stroke:[`none`,...k()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`right`,`left`],"inset-y":[`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`pr`,`pl`],py:[`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`mr`,`ml`],my:[`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-r`,`border-w-l`],"border-w-y":[`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-r`,`border-color-l`],"border-color-y":[`border-color-t`,`border-color-b`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}});function q(...e){return Et(M(e))}var J=s(),Dt=[{key:`Overview`,label:`Overview`,icon:ue},{key:`Support Queue`,label:`Support Queue`,icon:le},{key:`Live Simulator`,label:`Live Simulator`,icon:se},{key:`Agent Inbox`,label:`Agent Inbox`,icon:ce},{key:`Benchmarks`,label:`Benchmarks`,icon:D}];function Ot({active:e,onNav:t,provider:n,onProvider:r,apiKey:i,onApiKey:a}){let[o,s]=(0,b.useState)(!1),[c,l]=(0,b.useState)(!1);return(0,J.jsxs)(`aside`,{className:`flex h-screen w-[232px] flex-col border-r border-th-border bg-bg`,children:[(0,J.jsxs)(`div`,{className:`flex items-center gap-2 px-5 py-4`,children:[(0,J.jsx)(`div`,{className:`flex h-7 w-7 items-center justify-center rounded-md bg-accent text-black`,children:(0,J.jsx)(`svg`,{width:`15`,height:`15`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,J.jsx)(`path`,{d:`M3 12h4l3-8 4 16 3-8h4`})})}),(0,J.jsxs)(`div`,{className:`leading-tight`,children:[(0,J.jsx)(`div`,{className:`text-[15px] font-semibold tracking-tight text-text`,children:`TriageHub`}),(0,J.jsx)(`div`,{className:`text-[10px] uppercase tracking-[0.08em] text-text-subtle`,children:`PocketToons Support`})]})]}),(0,J.jsx)(`nav`,{className:`mt-2 flex-1 px-3`,children:Dt.map(({key:n,label:r,icon:i})=>{let a=e===n;return(0,J.jsxs)(`button`,{onClick:()=>t(n),className:q(`group mb-0.5 flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors`,a?`bg-surface-2 text-text`:`text-text-muted hover:bg-surface/60 hover:text-text`),style:{borderRadius:6},children:[a&&(0,J.jsx)(`span`,{className:`absolute left-0 h-5 w-[2px] rounded-r bg-accent`,style:{marginLeft:-12}}),(0,J.jsx)(i,{size:16,strokeWidth:1.75}),r]},n)})}),(0,J.jsxs)(`div`,{className:`border-t border-th-border px-3 py-3`,children:[(0,J.jsxs)(`button`,{onClick:()=>s(e=>!e),className:`flex w-full items-center gap-2 rounded-md px-3 py-2 text-[12px] text-text-muted transition-colors hover:text-text`,children:[(0,J.jsx)(j,{size:15,strokeWidth:1.75}),`LLM Integration`,(0,J.jsx)(O,{size:13,className:q(`ml-auto transition-transform`,o&&`rotate-180`)})]}),o&&(0,J.jsxs)(`div`,{className:`mt-2 space-y-2 px-2`,children:[(0,J.jsx)(`div`,{className:`eyebrow`,children:`Provider`}),(0,J.jsx)(`div`,{className:`flex gap-1`,children:[`Local`,`Gemini`,`OpenAI`].map(e=>(0,J.jsx)(`button`,{onClick:()=>r(e),className:q(`flex-1 rounded-[4px] border px-2 py-1 text-[11px] transition-colors`,n===e?`border-accent text-accent`:`border-th-border text-text-muted hover:text-text`),children:e},e))}),(0,J.jsx)(`input`,{value:i,onChange:e=>a(e.target.value),type:`password`,placeholder:`API key (optional)`,className:`w-full rounded-[4px] border border-th-border bg-surface-2 px-2 py-1.5 text-[11px] text-text placeholder:text-text-subtle outline-none focus:border-text-muted`}),(0,J.jsx)(`button`,{onClick:()=>{i.trim()&&(l(!0),setTimeout(()=>l(!1),2400))},className:`w-full rounded-[4px] bg-accent/90 py-1 text-[11px] font-semibold text-black transition-opacity hover:opacity-100 cursor-pointer`,children:`Apply Key`}),c&&(0,J.jsxs)(`p`,{className:`text-[10px] text-ok font-medium`,children:[`✓ Mode Active: `,n]}),(0,J.jsx)(`p`,{className:`text-[10px] leading-snug text-text-subtle`,children:`The local classifier runs without a key. Selecting Gemini or OpenAI with a key enables live AI-powered triage and reply generation.`})]})]}),(0,J.jsx)(`div`,{className:`px-5 py-2.5 text-[10px] text-text-subtle`,children:`v1.0 · UI rebuild`})]})}function kt({children:e}){return(0,J.jsx)(`div`,{className:`flex min-h-screen bg-bg font-sans text-text`,style:{fontFamily:`Inter, sans-serif`},children:e})}function Y({children:e,className:t}){return(0,J.jsx)(`div`,{className:q(`eyebrow`,t),children:e})}function X({title:e,subtitle:t}){return(0,J.jsxs)(`div`,{className:`mb-6`,children:[(0,J.jsx)(`h1`,{className:`text-2xl font-semibold tracking-tight text-text`,style:{letterSpacing:`-0.02em`},children:e}),t&&(0,J.jsx)(`p`,{className:`mt-1 text-[13px] text-text-muted`,children:t})]})}function Z({children:e,className:t,as:n=`div`}){return(0,J.jsx)(n,{className:q(`rounded-md border border-th-border bg-surface`,t),style:{borderRadius:6},children:e})}var At={"Severe/Frustrated":`#e0625a`,Negative:`#c98a4b`,Neutral:`var(--text-muted)`,Positive:`var(--ok)`};function jt({sentiment:e}){let t=At[e]??`var(--text-muted)`;return(0,J.jsx)(`span`,{className:`inline-flex items-center rounded-[3px] border px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em]`,style:{color:t,borderColor:t,backgroundColor:`color-mix(in oklab, ${t} 10%, transparent)`},children:e})}function Mt({escalated:e}){return e?(0,J.jsx)(`span`,{className:`inline-flex items-center rounded-[3px] border px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em]`,style:{color:`var(--accent)`,borderColor:`var(--accent)`,backgroundColor:`var(--accent-soft)`},children:`Human Escalation Required`}):(0,J.jsx)(`span`,{className:`inline-flex items-center rounded-[3px] border border-th-border bg-surface-2 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] text-text-muted`,children:`Auto-Reply Eligible`})}function Nt({children:e}){return(0,J.jsx)(`span`,{className:`inline-flex items-center rounded-[3px] border border-th-border bg-surface-2 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] text-text`,children:e})}function Pt({value:e}){let t=Math.round(e*100),n=e>=.8?`var(--ok)`:e>=.6?`var(--accent)`:`var(--danger)`;return(0,J.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,J.jsx)(`div`,{className:`h-1.5 w-16 overflow-hidden rounded-full bg-surface-2`,children:(0,J.jsx)(`div`,{className:`h-full rounded-full`,style:{width:`${t}%`,backgroundColor:n}})}),(0,J.jsx)(`span`,{className:`text-xs tabular-nums text-text-muted`,children:e.toFixed(2)})]})}function Q({variant:e=`secondary`,size:t=`md`,className:n,...r}){return(0,J.jsx)(`button`,{className:q(`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap`,t===`sm`?`px-2.5 py-1 text-xs`:`px-3.5 py-2 text-[13px]`,{primary:`bg-accent text-black hover:brightness-110`,secondary:`border border-th-border bg-surface-2 text-text hover:border-text-muted`,ghost:`text-text-muted hover:text-text hover:bg-surface-2`,danger:`border border-th-border bg-surface-2 text-danger hover:bg-danger/10`}[e],n),style:{borderRadius:5},...r})}function $({className:e,children:t,...n}){return(0,J.jsx)(`select`,{className:q(`rounded-md border border-th-border bg-surface-2 px-2.5 py-1.5 text-[13px] text-text outline-none transition-colors focus:border-text-muted`,e),style:{borderRadius:5},...n,children:t})}function Ft({className:e,...t}){return(0,J.jsx)(`input`,{className:q(`w-full rounded-md border border-th-border bg-surface-2 px-3 py-2 text-[13px] text-text placeholder:text-text-subtle outline-none transition-colors focus:border-text-muted`,e),style:{borderRadius:5},...t})}function It({className:e,...t}){return(0,J.jsx)(`textarea`,{className:q(`w-full rounded-md border border-th-border bg-surface-2 px-3 py-2 text-[13px] text-text placeholder:text-text-subtle outline-none transition-colors focus:border-text-muted resize-y`,e),style:{borderRadius:5},...t})}function Lt({data:e,color:t=`var(--accent)`}){if(!e.length)return(0,J.jsx)(`svg`,{width:96,height:28});let n=Math.max(...e,1),r=Math.min(...e,0),i=n-r||1;return(0,J.jsx)(`svg`,{width:96,height:28,className:`overflow-visible`,children:(0,J.jsx)(`polyline`,{points:e.map((t,n)=>{let a=n/(e.length-1)*96,o=28-(t-r)/i*24-2;return`${a.toFixed(1)},${o.toFixed(1)}`}).join(` `),fill:`none`,stroke:t,strokeWidth:1.5,strokeLinejoin:`round`,strokeLinecap:`round`})})}function Rt({label:e,value:t,sub:n,spark:r,sparkColor:i}){return(0,J.jsx)(Z,{className:`px-4 py-3.5`,children:(0,J.jsxs)(`div`,{className:`flex items-start justify-between`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{className:`eyebrow`,children:e}),(0,J.jsx)(`div`,{className:`mt-1 text-[26px] font-semibold leading-none text-text tabular-nums`,style:{letterSpacing:`-0.02em`},children:t}),n&&(0,J.jsx)(`div`,{className:`mt-1.5 text-[11px] text-text-subtle`,children:n})]}),r&&(0,J.jsx)(Lt,{data:r,color:i})]})})}function zt({message:e}){return(0,J.jsx)(`div`,{className:`fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2 rounded-md border border-th-border bg-surface-2 px-4 py-2.5 text-[13px] text-text shadow-lg`,children:e})}var Bt=h({method:`POST`}).handler(r(`0ab5dfe3d27fd6afd206321a7609b8f4dca369947f39cd1d12342627d2474450`)),Vt=[`CEO Billionaire`,`Vampire Prince`,`CEO's Hidden Heiress`,`Shadow Monarch`,`Shadow Hunter`,`Reborn Legend`,`Alpha King`,`Alpha Dragon King`],Ht=[`iPhone`,`Samsung`,`Galaxy`,`Pixel`,`iPad`,`Android`,`iOS`,`CarPlay`,`Bluetooth`,`Chrome`,`Safari`,`MacBook`];function Ut(e,t){let n=e.toLowerCase(),r=0;for(let e of t.keywords){n.includes(e.toLowerCase())&&(r+=2);let t=e.toLowerCase().split(/\s+/);t.length>1&&n.includes(t[0])&&(r+=.5)}for(let e of t.subcategories)for(let t of e.toLowerCase().split(/[\s/]+/))t.length>2&&n.includes(t)&&(r+=.8);for(let e of t.description.toLowerCase().split(/\W+/))e.length>4&&n.includes(e)&&(r+=.2);return r}function Wt(e,t){let n=x.categories.find(t=>t.name===e);if(!n)return`General`;let r=t.toLowerCase(),i=n.subcategories[0],a=0;for(let e of n.subcategories){let t=0;for(let n of e.toLowerCase().split(/[\s/]+/))n.length>2&&r.includes(n)&&(t+=1);t>a&&(a=t,i=e)}return i}function Gt(e){let t=e.toLowerCase(),n=[`hacked`,`lawyer`,`attorney`,`scam`,`scammers`,`thieves`,`police`,`chargeback`,`horrible`,`terrible`,`worst app`,`stole my money`,`sue`],r=[`error`,`fail`,`failed`,`broken`,`issue`,`bug`,`stuck`,`frustrated`,`cancel`,`disappointed`,`refund`,`locked`],i=[`love`,`great`,`awesome`,`amazing`,`good`,`enjoy`,`fantastic`,`thanks`,`thank you`];if(n.filter(e=>t.includes(e)).length>0||t.includes(`!`)&&[`refund`,`stole`,`never`].some(e=>t.includes(e)))return`Severe/Frustrated`;let a=r.filter(e=>t.includes(e)).length,o=i.filter(e=>t.includes(e)).length;return a>o?`Negative`:o>a?`Positive`:`Neutral`}function Kt(e,t,n,r){let i=e.toLowerCase(),a=[],o=x.global_escalation_rules;o.legal_keywords.some(e=>i.includes(e.toLowerCase()))&&a.push(`Legal/chargeback threat detected in message`),o.abuse_keywords.some(e=>i.includes(e.toLowerCase()))&&a.push(`Abuse / scam accusation language detected`),[`hacked`,`unauthorized login`,`stolen account`,`security breach`,`compromised`].some(e=>i.includes(e))&&a.push(`Account security / compromise alert`),[`gdpr`,`ccpa`,`delete my account`,`data erasure`,`delete personal data`].some(e=>i.includes(e))&&a.push(`Regulatory compliance / Data deletion request`);let s=o.min_confidence_threshold??.6;n<s&&a.push(`Low classifier confidence (${n.toFixed(2)} < ${s.toFixed(2)})`);let c=x.categories.find(e=>e.name===t);if(c&&!c.auto_reply_eligible&&a.push(`Category '${t}' requires human agent review`),c)for(let e of c.escalation_triggers)i.includes(e.toLowerCase())&&a.push(`Category escalation trigger ('${e}')`);return r===`Severe/Frustrated`&&[`Billing & Refunds`,`Account & Security`].includes(t)&&(a.includes(`Severe frustration on sensitive category`)||a.push(`Severe frustration on sensitive category`)),{escalate:a.length>0,reasons:a}}function qt(e){let t={user_id:null,order_id:null,amount:null,series:null,device:null},n=e.match(/\bUSR-\d+\b/i);n&&(t.user_id=n[0].toUpperCase());let r=e.match(/\b(?:ORD-\d+|GP\.\d+-\d+|order\s*#?\s*\d+)\b/i);r&&(t.order_id=r[0].replace(/order\s*#?\s*/i,``).toUpperCase());let i=e.match(/\$\d+(?:\.\d{2})?/);if(i)t.amount=i[0];else{let n=e.match(/\b\d+\s*(?:coins?|coin\s*pack|coin\s*bundle)\b/i);n&&(t.amount=n[0])}let a=e.toLowerCase();for(let e of Ht)if(a.includes(e.toLowerCase())){t.device=e;break}for(let e of Vt)if(a.includes(e.toLowerCase())){t.series=e;break}return t}function Jt(e,t,n,r,i){let a=x.app_name;if(n)return`[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]\nEscalation Trigger: ${i?`Reason: ${i}`:`Requires manual review.`}\n\nHello,\n\nThank you for reaching out to ${a} Support. Your request has been escalated to a senior support specialist for priority review. Our engineering and billing team will inspect your account details and follow up with you within 2-4 hours.\n\nBest regards,\n${a} Tier 2 Escalations Team`;let o=r.user_id||`your account`,s=r.order_id?`Order #${r.order_id}`:`your transaction`,c=r.amount||`your coin pack`,l=r.series?`'${r.series}'`:`your favorite show`,u=r.device||`your device`;return e===`Billing & Refunds`?t===`Double Billing`?`Hello,\n\nThank you for contacting ${a} Support!\n\nWe apologize for the inconvenience caused by the duplicate charge for ${c} regarding ${s}.\n\nOur billing system has flagged this double billing issue, and we have submitted a reversal request to your bank. Depending on your financial institution or app store, the refunded amount should reflect in your bank statement within 3 to 5 business days.\n\nIf you need any further assistance, please reply directly to this message.\n\nWarm regards,\n${a} Support Team`:t===`Refund Request`?`Hello,\n\nThank you for reaching out to ${a} Billing Team regarding your refund request.\n\nWe understand accidental purchases happen. We have verified ${s} for ${c} on your user profile (${o}). If this purchase was made within the last 14 days and the coin balance/content remains unused, a full refund to your original payment method will be processed within 24-48 hours.\n\nLet us know if you have any questions.\n\nBest regards,\n${a} Billing Team`:t===`Subscription Cancellation Issue`?`Hello,\n\nThank you for contacting ${a}. We're sorry to see you go!\n\nWe have verified user profile ${o} and stopped any future recurring auto-renewals for your monthly subscription pass. You will continue to have full access to your VIP privileges until the end of your current billing cycle.\n\nYou can also manage your subscriptions directly via your device settings:\n• iOS: Settings > Apple ID > Subscriptions > PocketToons\n• Android: Play Store > Profile > Payments & subscriptions > Subscriptions\n\nLet us know if you need anything else!\n\nWarm regards,\n${a} Customer Care`:`Hello,\n\nThank you for reaching out to ${a} Billing Support.\n\nWe have received your billing query regarding ${s}. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.\n\nThank you for your patience,\n${a} Support Team`:e===`Content Access & Coins`?t===`Coins Not Credited`?`Hello,\n\nThank you for bringing this to our attention!\n\nWe apologize for the delay in crediting your purchased ${c} to your wallet under ${o} for ${s}.\n\nTo immediately sync your coin wallet, please try the following steps:\n1. Force-close the ${a} app and re-open it.\n2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.\n\nOur system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please reply directly to this email.\n\nBest regards,\n${a} Content Team`:t===`Episode Locked After Unlock`?`Hello,\n\nWe apologize for the glitch with your unlocked content for ${l}. Our content team has refreshed your library access permissions.\n\nTo resolve this immediately:\n1. Force-close and relaunch the app.\n2. Go to Profile > My Library > tap 'Restore Purchases'.\n\nYour episode should now be accessible. If still locked, reply with a screenshot and we'll fix it right away.\n\nBest regards,\n${a} Content Team`:t===`VIP Membership Missing`?`Hello,\n\nThank you for reaching out about your VIP Pass.\n\nWe have verified your purchase and restored your VIP Membership on profile ${o}. Your premium access should now be active — please log out and back in to refresh your benefits.\n\nIf your VIP badge still doesn't appear, tap 'Restore Purchases' under Settings. We're here if you need anything else.\n\nBest regards,\n${a} VIP Support`:`Hello,\n\nThank you for reaching out to ${a} Content Team.\n\nWe have refreshed your account library permissions for ${o}. Please log out and back in to see ${l}.\n\nWarm regards,\n${a} Team`:e===`Technical & Playback Bugs`?`Hello,\n\nThank you for reporting this playback issue on ${u} to ${a} Engineering.\n\nWe recommend attempting the following troubleshooting steps:\n1. Ensure your app is updated to the latest version in App Store / Play Store.\n2. Go to Settings > Storage & Cache > Clear Cache.\n3. Toggle Airplane Mode ON for 5 seconds and back OFF.\n\nOur tech team has logged your device details (${u}) for further diagnostics on this bug.\n\nBest regards,\n${a} Tech Support`:e===`Feedback & General`?`Hello,\n\nThank you so much for taking the time to share your feedback about ${l} with ${a}!\n\nWe love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.\n\nThanks for being a valued part of our community!\n\nWarmly,\n${a} Product Team`:`Hello,\n\nThank you for reaching out to ${a} Support. We have received your ticket and our support specialists are investigating your request.\n\nBest regards,\n${a} Support Team`}async function Yt(e,t,n){let r=e.subject||``,i=e.body||``,a=`${r} ${i}`,o=``,s=``,c=``,l=.5,u=``,d=!1;if(n&&n.trim()&&t&&t!==`Local`)try{t.toLowerCase();let e=x.categories.map(e=>e.name),a=`You are a sophisticated Customer Support Triage AI for PocketToons (an audio-webtoon app).
Your task is to classify the support ticket into exactly one primary category from the taxonomy list below.

--- TAXONOMY CATEGORIES ---
`;for(let e of x.categories)a+=`- ${e.name}: ${e.description}\n  Subcategories: ${e.subcategories.join(`, `)}\n`;a+=`
--- SUPPORT TICKET ---
Subject: ${r}
Body: ${i}

--- INSTRUCTIONS ---
Analyze the ticket and return a JSON object with the following fields:
1. 'category': Must match EXACTLY one of the names in the taxonomy list above: ${JSON.stringify(e)}.
2. 'subcategory': A matching subcategory from that category's subcategory list.
3. 'sentiment': One of: ['Positive', 'Neutral', 'Negative', 'Severe/Frustrated'].
4. 'confidence_score': A float between 0.0 and 1.0 indicating your confidence.
5. 'reasoning': A brief 1-sentence explanation of your classification decision.

Return ONLY valid JSON. Do not include markdown wraps.`;let f=await Bt({data:{provider:t,apiKey:n,prompt:a,isJson:!0}});if(f){let e=JSON.parse(f);e.category&&(o=e.category,s=e.subcategory||`General`,c=e.sentiment||`Neutral`,l=e.confidence_score||.95,u=e.reasoning||`Decided by live Generative LLM.`,d=!0)}}catch(e){console.error(`LLM classification failed, falling back to local model:`,e)}if(!d)return Xt(e);let f=qt(a),{escalate:p,reasons:m}=Kt(a,o,l,c),h=m.length?m.join(`; `):null;return{ticket_id:e.ticket_id||`TCK-${Math.floor(1e3+Math.random()*9e3)}`,subject:r,body:i,predicted_category:o,predicted_subcategory:s,confidence_score:l,sentiment:c,escalate_to_human:p,escalation_reason:h,suggested_reply:Jt(o,s,p,f,h),extracted_entities:f,classification_reasoning:u,used_llm_classifier:d,device_info:e.device_info||`Unknown Device`,app_version:e.app_version||`Unknown Version`}}function Xt(e){let t=e.subject||``,n=e.body||``,r=`${t} ${n}`,i=x.categories.map(e=>({cat:e,score:Ut(r,e)}));i.sort((e,t)=>t.score-e.score);let a=i[0],o=a.score,s=i[1]?i[1].score:0,c=o<=0?.5:Math.min(.97,.62+(o-s)*.04+o*.012),l=Math.max(.5,Math.round(c*100)/100),u=a.cat.name,d=Wt(u,r),f=Gt(r),p=a.score>0?`Strong keyword match for {category} taxonomy terms in subject and body.`:`No strong taxonomy match; defaulted to closest category (${u}).`,m=qt(r),{escalate:h,reasons:g}=Kt(r,u,l,f),_=g.length?g.join(`; `):null;return{ticket_id:e.ticket_id||`TCK-${Math.floor(1e3+Math.random()*9e3)}`,subject:t,body:n,predicted_category:u,predicted_subcategory:d,confidence_score:l,sentiment:f,escalate_to_human:h,escalation_reason:_,suggested_reply:Jt(u,d,h,m,_),extracted_entities:m,classification_reasoning:p,used_llm_classifier:!1,device_info:e.device_info||`Unknown Device`,app_version:e.app_version||`Unknown Version`}}var Zt=[{label:`Double Charge`,subject:`Charged twice for 500 coins`,body:`Hi, I bought the $9.99 coin pack on my iPhone yesterday. My bank shows two pending charges of $9.99 for order ORD-99120. Please refund the duplicate $9.99.`},{label:`Coins Missing`,subject:`Coins not added after payment`,body:`I purchased 1000 coins for $14.99 30 minutes ago via Apple Pay. Order ORD-881203, but my coin wallet still shows 0. User ID USR-49120. Credit my coins!`},{label:`Episode Locked`,subject:`Episode locked after spending 10 coins`,body:`I spent 10 coins to unlock Episode 15 of Alpha Dragon King. Coins were deducted, but the episode still shows a padlock icon. Unlock it please!`},{label:`Legal Threat`,subject:`Fraudulent charge on card - contacting lawyer`,body:`I saw a charge of $49.99 from PocketToons on my credit card. I never signed up! Refund me now or I will notify my lawyer and file a bank chargeback.`},{label:`Hacked Account`,subject:`URGENT: Someone hacked my account!`,body:`I got a notification about a login from Germany. I live in Texas! Someone spent 800 of my saved coins! Freeze my account and reset my password immediately!`}];async function Qt(e,t,n){t.toLowerCase();let r=`You are a professional, empathetic customer support specialist for PocketToons (an audio-webtoon app).
Draft a concise, helpful, and polite reply to the support ticket below.

Ticket Subject: ${e.subject}
Ticket Body: ${e.body}
Predicted Category: ${e.predicted_category}
Predicted Subcategory: ${e.predicted_subcategory}

--- INSTRUCTIONS ---
- Address the user politely.
- Provide clear, actionable instructions or troubleshooting steps based on their category.
- Do not make up internal details, keep it professional.
- Do not wrap the response in quotes or markdown formatting. Keep it plain text ready to be sent.`;try{return await Bt({data:{provider:t,apiKey:n,prompt:r,isJson:!1}})}catch(e){console.error(`AI reply generation failed:`,e)}return`Failed to generate AI response. Please verify your API Key and connection.`}var $t=x.categories.map(e=>e.name),en=[`#d4a056`,`#7c8db5`,`#6fbf8b`,`#c98a4b`,`#8a8a8f`];function tn(e){return e*7%12}function nn({tickets:e,onAdd:t}){let[n,r]=(0,b.useState)(!1),[i,a]=(0,b.useState)(``),o=(0,b.useMemo)(()=>{let t=e.length;return{total:t,auto:e.filter(e=>!e.escalate_to_human).length,esc:e.filter(e=>e.escalate_to_human).length,meanConf:e.reduce((e,t)=>e+t.confidence_score,0)/Math.max(1,t)}},[e]),s=(0,b.useMemo)(()=>{let t={},n={};return $t.forEach(e=>t[e]=0),e.forEach(e=>{t[e.predicted_category]=(t[e.predicted_category]||0)+1,e.escalate_to_human&&(n[e.predicted_category]=(n[e.predicted_category]||0)+1)}),{counts:t,escCounts:n}},[e]),c=e.length||1,l=(0,b.useMemo)(()=>{let t=Array.from({length:12},(e,t)=>({label:`${t*2%24}:00`,esc:0,total:0}));return e.forEach((e,n)=>{let r=tn(n);t[r].total++,e.escalate_to_human&&t[r].esc++}),t[6].esc=Math.max(t[6].esc,Math.round(o.esc*.22)),t},[e,o.esc]),u=(0,b.useMemo)(()=>Array.from({length:10},(e,t)=>o.auto*(.8+.04*t+Math.sin(t)*.05)),[o.auto]),d=(0,b.useMemo)(()=>Array.from({length:10},(e,t)=>o.esc*(.9+.02*t)),[o.esc]),f=(0,b.useMemo)(()=>Array.from({length:10},(e,t)=>.7+Math.sin(t)*.06+t*.01),[]),p=(0,b.useMemo)(()=>Array.from({length:10},(e,t)=>o.total*(.85+.025*t)),[o.total]);function m(){let e=i.trim().split(/\n+/),n=[];e.forEach((e,r)=>{let[i,a]=e.split(/,(.*)/s);if(!i||!a)return;let o=Xt({subject:i.trim(),body:a.trim()}),s={...o,ticket_id:`TCK-${9e3+r}`,escalation_reason:o.escalation_reason};t(s),n.push(s)}),a(``),r(!1)}return(0,J.jsxs)(`div`,{className:`px-8 py-6`,children:[(0,J.jsx)(X,{title:`Support Triage Command Center`,subtitle:`Real-time view of AI ticket classification, routing decisions, and escalation throughput across the PocketToons support pipeline.`}),(0,J.jsxs)(`div`,{className:`mb-5`,children:[(0,J.jsxs)(`button`,{onClick:()=>r(e=>!e),className:`flex items-center gap-1.5 text-[12px] text-text-muted transition-colors hover:text-text`,children:[n?(0,J.jsx)(O,{size:14}):(0,J.jsx)(oe,{size:14}),(0,J.jsx)(de,{size:13}),` Import CSV`]}),n&&(0,J.jsxs)(`div`,{className:`mt-2 rounded-md border border-th-border bg-surface p-3`,style:{borderRadius:6},children:[(0,J.jsxs)(`p`,{className:`mb-2 text-[11px] text-text-subtle`,children:[`Paste rows as `,(0,J.jsx)(`code`,{className:`text-text-muted`,children:`subject,body`}),`. Each line is classified by the local engine and appended to the dataset.`]}),(0,J.jsx)(`textarea`,{value:i,onChange:e=>a(e.target.value),placeholder:`Charged twice for coins,Hi I bought 500 coins and got billed twice for order ORD-12345
Episode still locked,I spent coins but episode 12 of Vampire Prince is locked`,className:`h-20 w-full rounded-[5px] border border-th-border bg-surface-2 px-3 py-2 text-[12px] text-text placeholder:text-text-subtle outline-none focus:border-text-muted`}),(0,J.jsx)(`div`,{className:`mt-2 flex justify-end`,children:(0,J.jsx)(Q,{variant:`primary`,onClick:m,disabled:!i.trim(),children:`Process & Append`})})]})]}),(0,J.jsxs)(`div`,{className:`grid grid-cols-4 gap-4`,children:[(0,J.jsx)(Rt,{label:`Total Tickets`,value:o.total,sub:`In current triage dataset`,spark:p,sparkColor:`var(--text-muted)`}),(0,J.jsx)(Rt,{label:`Auto-Reply Eligible`,value:o.auto,sub:`Routed to automated draft`,spark:u,sparkColor:`var(--ok)`}),(0,J.jsx)(Rt,{label:`Human Escalations`,value:o.esc,sub:`Flagged for agent review`,spark:d,sparkColor:`var(--accent)`}),(0,J.jsx)(Rt,{label:`Mean Confidence`,value:o.meanConf.toFixed(2),sub:`Avg classifier score`,spark:f,sparkColor:`var(--accent)`})]}),(0,J.jsxs)(`div`,{className:`mt-6 grid grid-cols-5 gap-4`,children:[(0,J.jsxs)(Z,{className:`col-span-2 px-4 py-4`,children:[(0,J.jsx)(Y,{children:`Category Breakdown`}),(0,J.jsx)(`div`,{className:`mt-3 flex h-3 w-full overflow-hidden rounded-full bg-surface-2`,children:$t.map((e,t)=>(0,J.jsx)(`div`,{style:{width:`${s.counts[e]/c*100}%`,backgroundColor:en[t]},title:e},e))}),(0,J.jsx)(`div`,{className:`mt-4 space-y-1`,children:$t.map((e,t)=>(0,J.jsxs)(`div`,{className:`flex items-center justify-between py-1 text-[12px]`,children:[(0,J.jsxs)(`span`,{className:`flex items-center gap-2 text-text`,children:[(0,J.jsx)(`span`,{className:`h-2.5 w-2.5 rounded-[2px]`,style:{backgroundColor:en[t]}}),e]}),(0,J.jsxs)(`span`,{className:`flex items-center gap-3`,children:[(0,J.jsx)(`span`,{className:`text-text-subtle`,children:s.counts[e]}),(0,J.jsxs)(`span`,{className:`w-10 text-right tabular-nums text-text-muted`,children:[Math.round(s.counts[e]/c*100),`%`]})]})]},e))})]}),(0,J.jsxs)(Z,{className:`col-span-3 px-4 py-4`,children:[(0,J.jsx)(Y,{children:`Escalation Rate Over Time`}),(0,J.jsx)(`div`,{className:`mt-5 flex h-[180px] items-end gap-1.5`,children:l.map((e,t)=>{let n=e.total?e.esc/e.total:0,r=Math.max(4,n*150+(e.esc?8:0)),i=t===6;return(0,J.jsxs)(`div`,{className:`group flex flex-1 flex-col items-center justify-end gap-1.5`,children:[(0,J.jsxs)(`span`,{className:`text-[9px] tabular-nums text-text-subtle opacity-0 group-hover:opacity-100`,children:[Math.round(n*100),`%`]}),(0,J.jsx)(`div`,{className:`w-full rounded-t-[2px] transition-colors`,style:{height:r,backgroundColor:i?`var(--accent)`:`var(--surface-2)`}}),(0,J.jsx)(`span`,{className:`text-[9px] tabular-nums text-text-subtle`,children:e.label})]},t)})}),(0,J.jsx)(`p`,{className:`mt-3 text-[11px] text-text-subtle`,children:`12-bucket rolling window · amber marks the midday escalation peak.`})]})]}),(0,J.jsx)(Z,{className:`mt-6 overflow-hidden`,children:(0,J.jsxs)(`table`,{className:`w-full text-[13px]`,children:[(0,J.jsx)(`thead`,{children:(0,J.jsxs)(`tr`,{className:`border-b border-th-border text-left text-text-muted`,children:[(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Category`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Tickets`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Escalated`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Auto-Replied`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Escalation Rate`})]})}),(0,J.jsx)(`tbody`,{children:$t.map((e,t)=>{let n=s.counts[e],r=s.escCounts[e]||0;return(0,J.jsxs)(`tr`,{className:`border-b border-th-border/50 last:border-0 hover:bg-surface-2/40`,children:[(0,J.jsx)(`td`,{className:`px-4 py-2.5`,children:(0,J.jsx)(Nt,{children:e})}),(0,J.jsx)(`td`,{className:`px-4 py-2.5 tabular-nums text-text`,children:n}),(0,J.jsx)(`td`,{className:`px-4 py-2.5`,children:(0,J.jsx)(`span`,{className:`text-accent`,children:r})}),(0,J.jsx)(`td`,{className:`px-4 py-2.5 text-text-muted`,children:n-r}),(0,J.jsx)(`td`,{className:`px-4 py-2.5`,children:(0,J.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,J.jsx)(`div`,{className:`h-1.5 w-20 overflow-hidden rounded-full bg-surface-2`,children:(0,J.jsx)(`div`,{className:`h-full rounded-full`,style:{width:`${n?r/n*100:0}%`,backgroundColor:en[t]}})}),(0,J.jsxs)(`span`,{className:`tabular-nums text-text-muted`,children:[n?Math.round(r/n*100):0,`%`]})]})})]},e)})})]})})]})}var rn=x.categories.map(e=>e.name),an=[`iPhone 14 Pro (iOS 17.4)`,`Samsung Galaxy S23 (Android 14)`,`Pixel 8 (Android 14)`,`iPad Air (iOS 17.2)`,`Web Browser (Chrome 122)`],on=[`v3.12.1`,`v3.12.0`,`v3.11.8`,`v3.10.4`],sn=[`Triage Auditor`,`Database Explorer`,`Inbound Ingestor`];function cn({tickets:e,resolved:t,onResolve:n,onUpdate:r,onAdd:i,focusId:a,provider:o,apiKey:s}){let[c,l]=(0,b.useState)(`Triage Auditor`),[u,d]=(0,b.useState)(`All Categories`),[f,p]=(0,b.useState)(`All status`),[m,h]=(0,b.useState)(``),g=(0,b.useMemo)(()=>{let t=e;if(u!==`All Categories`&&(t=t.filter(e=>e.predicted_category===u)),f===`Auto-Reply Eligible`?t=t.filter(e=>!e.escalate_to_human):f===`Escalated to Human`&&(t=t.filter(e=>e.escalate_to_human)),m){let e=m.toLowerCase();t=t.filter(t=>t.subject.toLowerCase().includes(e)||t.body.toLowerCase().includes(e)||t.ticket_id.toLowerCase().includes(e))}return t},[e,u,f,m]);return(0,J.jsxs)(`div`,{className:`px-8 py-6`,children:[(0,J.jsx)(X,{title:`Support Queue Control Center`,subtitle:`Supervise and audit triage predictions, release auto-replies, and dispatch human escalations.`}),(0,J.jsx)(`div`,{className:`mb-4 flex gap-6 border-b border-th-border`,children:sn.map(e=>(0,J.jsxs)(`button`,{onClick:()=>l(e),className:`relative -mb-px pb-2.5 text-[13px] font-medium transition-colors`,style:{color:c===e?`var(--text)`:`var(--text-muted)`},children:[e,c===e&&(0,J.jsx)(`span`,{className:`absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent`})]},e))}),(0,J.jsxs)(`div`,{className:`mb-5 flex items-center gap-3`,children:[(0,J.jsxs)($,{value:u,onChange:e=>d(e.target.value),children:[(0,J.jsx)(`option`,{children:`All Categories`}),rn.map(e=>(0,J.jsx)(`option`,{children:e},e))]}),(0,J.jsxs)($,{value:f,onChange:e=>p(e.target.value),children:[(0,J.jsx)(`option`,{children:`All status`}),(0,J.jsx)(`option`,{children:`Auto-Reply Eligible`}),(0,J.jsx)(`option`,{children:`Escalated to Human`})]}),(0,J.jsxs)(`div`,{className:`relative flex-1 max-w-sm`,children:[(0,J.jsx)(A,{size:14,className:`absolute left-2.5 top-1/2 -translate-y-1/2 text-text-subtle`}),(0,J.jsx)(Ft,{value:m,onChange:e=>h(e.target.value),placeholder:`Search subject, body, or ID...`,className:`pl-7`})]}),(0,J.jsxs)(`span`,{className:`text-[12px] text-text-subtle`,children:[g.length,` tickets`]})]}),g.length===0?(0,J.jsx)(Z,{className:`px-8 py-10 text-center text-text-muted`,children:`No matching tickets in current queue criteria.`}):c===`Triage Auditor`?(0,J.jsx)(ln,{tickets:g,resolved:t,onResolve:n,onUpdate:r,focusId:a,provider:o,apiKey:s}):c===`Database Explorer`?(0,J.jsx)(un,{tickets:g,onJump:e=>{},focusId:a}):(0,J.jsx)(dn,{onAdd:i,provider:o,apiKey:s})]})}function ln({tickets:e,resolved:t,onResolve:n,onUpdate:r,focusId:i,provider:a,apiKey:o}){let[s,c]=(0,b.useState)(i?Math.max(0,e.findIndex(e=>e.ticket_id===i)):0),[l,u]=(0,b.useState)(!1),d=Math.min(s,e.length-1),f=e[d],p=Math.max(0,d-4),m=Math.min(e.length,p+8);m-p<8&&(p=Math.max(0,m-8));let h=e.slice(p,m),[g,_]=(0,b.useState)(f.suggested_reply),v=f.ticket_id,[y,ee]=(0,b.useState)(v);y!==v&&(_(f.suggested_reply),ee(v));let[x,S]=(0,b.useState)(`-- Override Routing --`);return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Queue Track`}),(0,J.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,J.jsx)(Q,{size:`sm`,variant:`ghost`,disabled:d===0,onClick:()=>c(d-1),children:(0,J.jsx)(ae,{size:14})}),h.map(e=>{let t=p+h.indexOf(e);return(0,J.jsx)(`button`,{onClick:()=>c(t),className:`rounded-[5px] px-2.5 py-1.5 text-[12px] font-medium tabular-nums transition-colors`,style:t===d?{backgroundColor:`var(--accent)`,color:`#000`}:{border:`1px solid var(--border)`,color:`var(--text-muted)`},children:e.ticket_id},e.ticket_id)}),(0,J.jsx)(Q,{size:`sm`,variant:`ghost`,disabled:d>=e.length-1,onClick:()=>c(d+1),children:(0,J.jsx)(oe,{size:14})})]}),(0,J.jsxs)(`p`,{className:`mt-2 text-[12px] text-text-muted`,children:[`Active Triage Inspector: Ticket `,(0,J.jsx)(`b`,{className:`text-text`,children:d+1}),` of `,(0,J.jsx)(`b`,{className:`text-text`,children:e.length}),` (ID: `,f.ticket_id,`)`,t.has(f.ticket_id)&&(0,J.jsx)(`span`,{className:`ml-2 text-ok`,children:`· resolved`})]}),(0,J.jsxs)(`div`,{className:`mt-5 grid grid-cols-2 gap-4`,children:[(0,J.jsxs)(Z,{className:`p-5`,children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Customer Inbound Message`}),(0,J.jsx)(`div`,{className:`mb-3 text-[20px] font-medium leading-tight text-text`,style:{letterSpacing:`-0.02em`},children:f.subject}),(0,J.jsx)(`div`,{className:`mb-4 whitespace-pre-wrap rounded-[4px] border border-th-border bg-bg px-3.5 py-3.5 text-[13px] leading-relaxed text-text`,children:f.body}),(0,J.jsx)(Y,{className:`mb-1.5`,children:`Device Context`}),(0,J.jsxs)(`div`,{className:`flex flex-wrap gap-2 text-[12px] text-text-muted`,children:[(0,J.jsx)(`code`,{className:`rounded-[3px] border border-th-border bg-surface-2 px-1.5 py-0.5`,children:f.device_info}),(0,J.jsx)(`code`,{className:`rounded-[3px] border border-th-border bg-surface-2 px-1.5 py-0.5`,children:f.app_version})]})]}),(0,J.jsxs)(`div`,{children:[(0,J.jsxs)(Z,{className:`p-5`,children:[(0,J.jsx)(Y,{className:`mb-3`,children:`AI Diagnostics & Routing`}),(0,J.jsxs)(`div`,{className:`mb-4 flex items-center gap-2`,children:[(0,J.jsx)(Mt,{escalated:f.escalate_to_human}),(0,J.jsx)(Nt,{children:f.predicted_category}),f.used_llm_classifier?(0,J.jsx)(`span`,{className:`rounded bg-accent/15 border border-accent/30 text-accent px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider`,children:`AI Classifier`}):(0,J.jsx)(`span`,{className:`rounded bg-surface-2 border border-th-border text-text-muted px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider`,children:`Local Classifier`})]}),(0,J.jsxs)(`div`,{className:`space-y-1.5 text-[12px] leading-relaxed text-text-muted`,children:[(0,J.jsxs)(`div`,{children:[`Subcategory: `,(0,J.jsx)(`b`,{className:`text-text`,children:f.predicted_subcategory})]}),(0,J.jsxs)(`div`,{children:[`Confidence Score: `,(0,J.jsx)(`span`,{className:`inline-block align-middle`,children:(0,J.jsx)(Pt,{value:f.confidence_score})})]}),(0,J.jsxs)(`div`,{children:[`Customer Sentiment: `,(0,J.jsx)(jt,{sentiment:f.sentiment})]}),(0,J.jsx)(`div`,{className:`mt-1 border-l-2 border-th-border pl-3 text-[12px] italic text-text-subtle`,children:f.classification_reasoning||`Decided by local model`}),f.escalation_reason&&(0,J.jsxs)(`div`,{className:`mt-2 text-accent`,children:[`Escalation Trigger: `,f.escalation_reason]})]})]}),(0,J.jsxs)(Z,{className:`mt-3 p-5`,children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Suggested Response Draft`}),(0,J.jsx)(It,{value:g,onChange:e=>_(e.target.value),rows:6,className:`text-[12px]`}),(0,J.jsxs)(`div`,{className:`mt-3 flex items-center gap-2`,children:[f.escalate_to_human?(0,J.jsx)(Q,{variant:`primary`,onClick:()=>n(f.ticket_id),children:`Escalate to Human`}):(0,J.jsx)(Q,{variant:`primary`,onClick:()=>n(f.ticket_id),children:`Send Auto-Reply`}),(0,J.jsx)(Q,{onClick:()=>r(f.ticket_id,{suggested_reply:g}),children:`Save Draft`}),(0,J.jsx)(Q,{onClick:async()=>{if(!o){alert(`Please expand 'LLM Integration' in the sidebar and enter your API Key first.`);return}u(!0);let e=await Qt(f,a,o);_(e),r(f.ticket_id,{suggested_reply:e}),u(!1)},disabled:l,children:l?`Drafting...`:`✨ AI Draft`}),(0,J.jsxs)($,{value:x,onChange:e=>{let t=e.target.value;if(t!==`-- Override Routing --`){let e=[`Billing & Refunds`,`Account & Security`].includes(t);r(f.ticket_id,{predicted_category:t,escalate_to_human:e}),S(`-- Override Routing --`)}},children:[(0,J.jsx)(`option`,{children:`-- Override Routing --`}),rn.map(e=>(0,J.jsx)(`option`,{children:e},e))]})]})]})]})]})]})}function un({tickets:e,onJump:t,focusId:n}){let[r,i]=(0,b.useState)(0),a=Math.max(1,Math.ceil(e.length/15)),o=Math.min(r,a-1),s=e.slice(o*15,o*15+15);return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Database Explorer`}),(0,J.jsx)(Z,{className:`overflow-hidden`,children:(0,J.jsxs)(`table`,{className:`w-full text-[13px]`,children:[(0,J.jsx)(`thead`,{children:(0,J.jsxs)(`tr`,{className:`border-b border-th-border text-left text-text-muted`,children:[(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`ID`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Subject`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Category`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Confidence`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Routing`})]})}),(0,J.jsx)(`tbody`,{children:s.map(e=>(0,J.jsxs)(`tr`,{className:`border-b border-th-border/40 last:border-0 hover:bg-surface-2/40`,children:[(0,J.jsx)(`td`,{className:`px-4 py-2`,children:(0,J.jsx)(`button`,{onClick:()=>t(e.ticket_id),className:`font-medium text-accent hover:underline`,children:e.ticket_id})}),(0,J.jsx)(`td`,{className:`px-4 py-2 max-w-md truncate text-text`,children:e.subject}),(0,J.jsx)(`td`,{className:`px-4 py-2 text-text-muted`,children:e.predicted_category}),(0,J.jsx)(`td`,{className:`px-4 py-2`,children:(0,J.jsx)(Pt,{value:e.confidence_score})}),(0,J.jsx)(`td`,{className:`px-4 py-2`,children:e.escalate_to_human?(0,J.jsx)(`span`,{className:`text-accent`,children:`Escalated`}):(0,J.jsx)(`span`,{className:`text-text-muted`,children:`Auto-Reply`})})]},e.ticket_id))})]})}),(0,J.jsxs)(`div`,{className:`mt-4 flex items-center justify-between text-[12px] text-text-muted`,children:[(0,J.jsx)(Q,{size:`sm`,variant:`secondary`,disabled:o===0,onClick:()=>i(o-1),children:`◀ Previous`}),(0,J.jsxs)(`span`,{children:[`Page `,o+1,` of `,a,` (showing `,o*15+1,`–`,Math.min((o+1)*15,e.length),` of `,e.length,` tickets)`]}),(0,J.jsx)(Q,{size:`sm`,variant:`secondary`,disabled:o>=a-1,onClick:()=>i(o+1),children:`Next ▶`})]})]})}function dn({onAdd:e,provider:t,apiKey:n}){let[r,i]=(0,b.useState)(``),[a,o]=(0,b.useState)(``),[s,c]=(0,b.useState)(an[0]),[l,u]=(0,b.useState)(on[0]),[d,f]=(0,b.useState)(null),[p,m]=(0,b.useState)(``),[h,g]=(0,b.useState)(!1);async function _(){if(!r||!a){m(`Please specify both subject and body message.`);return}m(``),g(!0);try{let i=await Yt({subject:r,body:a,device_info:s,app_version:l},t,n),o={...i,escalation_reason:i.escalation_reason};e(o),f(o)}catch(e){console.error(e),m(`Failed to process ticket.`)}finally{g(!1)}}return(0,J.jsxs)(`div`,{className:`grid grid-cols-2 gap-6`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Inbound Ingestion Workspace`}),(0,J.jsx)(`p`,{className:`mb-4 text-[12px] text-text-subtle`,children:`Submit a new inbound customer ticket directly to the triage database pipeline.`}),(0,J.jsxs)(`div`,{className:`space-y-3`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`label`,{className:`eyebrow mb-1 block`,children:`Ticket Subject`}),(0,J.jsx)(Ft,{value:r,onChange:e=>i(e.target.value),placeholder:`e.g. Unauthorized renewal charge after cancel`})]}),(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`label`,{className:`eyebrow mb-1 block`,children:`Ticket Body / Customer Message`}),(0,J.jsx)(It,{value:a,onChange:e=>o(e.target.value),rows:8,placeholder:`e.g. Hello support, I cancelled my subscription pack but my card was charged...`})]}),(0,J.jsxs)(`div`,{className:`grid grid-cols-2 gap-3`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`label`,{className:`eyebrow mb-1 block`,children:`Device Platform`}),(0,J.jsx)($,{value:s,onChange:e=>c(e.target.value),className:`w-full`,children:an.map(e=>(0,J.jsx)(`option`,{children:e},e))})]}),(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`label`,{className:`eyebrow mb-1 block`,children:`App Build Version`}),(0,J.jsx)($,{value:l,onChange:e=>u(e.target.value),className:`w-full`,children:on.map(e=>(0,J.jsx)(`option`,{children:e},e))})]})]}),p&&(0,J.jsx)(`p`,{className:`text-[12px] text-danger`,children:p}),(0,J.jsx)(Q,{variant:`primary`,onClick:_,disabled:h,children:h?`Analyzing Inbound...`:`Submit & Analyze Inbound Ticket`})]})]}),d&&(0,J.jsxs)(Z,{className:`p-5`,children:[(0,J.jsx)(Y,{className:`mb-3`,children:`Triage Result`}),(0,J.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 text-[13px]`,children:[(0,J.jsx)(fn,{label:`Predicted Category`,value:d.predicted_category}),(0,J.jsx)(fn,{label:`Subcategory`,value:d.predicted_subcategory}),(0,J.jsx)(fn,{label:`Confidence`,value:d.confidence_score.toFixed(2)}),(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{className:`eyebrow mb-1`,children:`Sentiment`}),(0,J.jsx)(jt,{sentiment:d.sentiment})]})]}),(0,J.jsxs)(`div`,{className:`mt-3`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Routing`}),(0,J.jsx)(Mt,{escalated:d.escalate_to_human}),d.escalation_reason&&(0,J.jsx)(`p`,{className:`mt-1.5 text-[12px] text-accent`,children:d.escalation_reason})]}),(0,J.jsxs)(`div`,{className:`mt-3`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Suggested Reply Draft`}),(0,J.jsx)(`div`,{className:`whitespace-pre-wrap rounded-[4px] border border-th-border bg-bg px-3 py-2.5 text-[12px] leading-relaxed text-text`,children:d.suggested_reply})]}),(0,J.jsxs)(`p`,{className:`mt-3 text-[11px] text-ok`,children:[`Ticket `,d.ticket_id,` processed and added to the queue.`]})]})]})}function fn({label:e,value:t}){return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{className:`eyebrow mb-1`,children:e}),(0,J.jsx)(`div`,{className:`font-medium text-text`,children:t})]})}function pn({provider:e,apiKey:t}){let[n,r]=(0,b.useState)(``),[i,a]=(0,b.useState)(``),[o,s]=(0,b.useState)(null),[c,l]=(0,b.useState)(!1);async function u(){if(!(!n&&!i)){l(!0);try{let r=await Yt({ticket_id:`SIM-001`,subject:n,body:i},e,t);s(r)}catch(e){console.error(e)}finally{l(!1)}}}return(0,J.jsxs)(`div`,{className:`px-8 py-6`,children:[(0,J.jsx)(X,{title:`Live Simulator`,subtitle:`Run a single inbound ticket through the triage engine to inspect classification, routing, and the generated reply in real time.`}),(0,J.jsxs)(`div`,{className:`grid grid-cols-2 gap-6`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Presets`}),(0,J.jsx)(`div`,{className:`mb-4 flex flex-wrap gap-2`,children:Zt.map(e=>(0,J.jsx)(Q,{size:`sm`,variant:`secondary`,onClick:()=>{r(e.subject),a(e.body)},children:e.label},e.label))}),(0,J.jsxs)(`div`,{className:`space-y-3`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`label`,{className:`eyebrow mb-1 block`,children:`Subject`}),(0,J.jsx)(Ft,{value:n,onChange:e=>r(e.target.value)})]}),(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`label`,{className:`eyebrow mb-1 block`,children:`Body`}),(0,J.jsx)(It,{value:i,onChange:e=>a(e.target.value),rows:6})]}),(0,J.jsx)(Q,{variant:`primary`,onClick:u,disabled:!n&&!i||c,children:c?`Running Triage...`:`Run Triage Analysis`})]})]}),o&&(0,J.jsxs)(`div`,{children:[(0,J.jsxs)(`div`,{className:`mb-3 flex items-center justify-between`,children:[(0,J.jsx)(Y,{children:`Triage Results`}),o.used_llm_classifier?(0,J.jsx)(`span`,{className:`rounded bg-accent/15 border border-accent/30 text-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider`,children:`AI Classifier`}):(0,J.jsx)(`span`,{className:`rounded bg-surface-2 border border-th-border text-text-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider`,children:`Local Heuristics`})]}),(0,J.jsxs)(`div`,{className:`grid grid-cols-4 gap-3`,children:[(0,J.jsx)(mn,{label:`Predicted Category`,value:o.predicted_category}),(0,J.jsx)(mn,{label:`Subcategory`,value:o.predicted_subcategory}),(0,J.jsx)(mn,{label:`Confidence`,value:o.confidence_score.toFixed(2)}),(0,J.jsxs)(`div`,{className:`rounded-md border border-th-border bg-surface px-3 py-2.5`,style:{borderRadius:6},children:[(0,J.jsx)(`div`,{className:`eyebrow`,children:`Sentiment`}),(0,J.jsx)(`div`,{className:`mt-1.5`,children:(0,J.jsx)(jt,{sentiment:o.sentiment})})]})]}),(0,J.jsxs)(`div`,{className:`mt-4`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Extracted Entities`}),(0,J.jsx)(Z,{className:`px-4 py-3`,children:(0,J.jsx)(`div`,{className:`grid grid-cols-5 gap-2 text-[12px]`,children:Object.entries(o.extracted_entities).map(([e,t])=>(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{className:`eyebrow text-text-subtle`,children:e}),(0,J.jsx)(`div`,{className:`mt-0.5 font-medium text-text`,children:t||`—`})]},e))})})]}),(0,J.jsxs)(`div`,{className:`mt-4`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Classification Reasoning`}),(0,J.jsx)(`p`,{className:`text-[12px] italic text-text-subtle`,children:o.classification_reasoning})]}),(0,J.jsxs)(`div`,{className:`mt-4`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Routing Action`}),(0,J.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,J.jsx)(Mt,{escalated:o.escalate_to_human}),o.escalation_reason&&(0,J.jsx)(`span`,{className:`text-[12px] text-accent`,children:o.escalation_reason})]})]}),(0,J.jsxs)(`div`,{className:`mt-4`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Suggested Reply Draft`}),(0,J.jsx)(It,{defaultValue:o.suggested_reply,rows:7,className:`text-[12px]`})]})]})]})]})}function mn({label:e,value:t}){return(0,J.jsxs)(`div`,{className:`rounded-md border border-th-border bg-surface px-3 py-2.5`,style:{borderRadius:6},children:[(0,J.jsx)(`div`,{className:`eyebrow`,children:e}),(0,J.jsx)(`div`,{className:`mt-1 text-[15px] font-semibold text-text`,children:t})]})}var hn=x.categories.map(e=>e.name);function gn({tickets:e,resolved:t,onResolve:n,onUpdate:r,provider:i,apiKey:a}){let o=(0,b.useMemo)(()=>e.filter(e=>e.escalate_to_human),[e]);return o.length===0?(0,J.jsxs)(`div`,{className:`px-8 py-6`,children:[(0,J.jsx)(X,{title:`Agent Desk`,subtitle:`Escalated tickets awaiting human review.`}),(0,J.jsxs)(Z,{className:`px-8 py-12 text-center`,children:[(0,J.jsx)(k,{size:26,className:`mx-auto text-text-subtle`,strokeWidth:1.5}),(0,J.jsx)(`div`,{className:`mt-3 text-[14px] font-medium text-text`,children:`No escalated tickets pending review`}),(0,J.jsx)(`div`,{className:`mt-1 text-[12px] text-text-muted`,children:`All queues are currently clear.`})]})]}):(0,J.jsx)(_n,{tickets:o,resolved:t,onResolve:n,onUpdate:r,provider:i,apiKey:a})}function _n({tickets:e,resolved:t,onResolve:n,onUpdate:r,provider:i,apiKey:a}){let[o,s]=(0,b.useState)(e[0].ticket_id),c=e.find(e=>e.ticket_id===o)??e[0],[l,u]=(0,b.useState)(c.suggested_reply),[d,f]=(0,b.useState)(`-- Choose Category --`),[p,m]=(0,b.useState)(!1),h=c.ticket_id,[g,_]=(0,b.useState)(h);return g!==h&&(u(c.suggested_reply),_(h)),(0,J.jsxs)(`div`,{className:`px-8 py-6`,children:[(0,J.jsx)(X,{title:`Agent Desk`,subtitle:`Escalated tickets awaiting human review.`}),(0,J.jsxs)(`div`,{className:`grid grid-cols-10 gap-4`,children:[(0,J.jsxs)(`div`,{className:`col-span-4`,children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Escalations Queue`}),(0,J.jsx)(`div`,{className:`space-y-2`,children:e.map(e=>(0,J.jsxs)(`button`,{onClick:()=>s(e.ticket_id),className:`w-full rounded-md border px-3 py-2.5 text-left transition-colors`,style:e.ticket_id===o?{backgroundColor:`var(--surface-2)`,borderColor:`var(--text-muted)`}:{backgroundColor:`var(--surface)`,borderColor:`var(--border)`},children:[(0,J.jsxs)(`div`,{className:`flex items-center justify-between text-[11px] font-semibold text-text-muted`,children:[(0,J.jsx)(`span`,{children:e.ticket_id}),(0,J.jsx)(`span`,{className:`uppercase`,children:e.sentiment})]}),(0,J.jsx)(`div`,{className:`mt-0.5 truncate text-[13px] font-medium text-text`,children:e.subject}),(0,J.jsxs)(`div`,{className:`mt-0.5 text-[11px] text-text-subtle`,children:[e.predicted_category,t.has(e.ticket_id)?` · resolved`:``]})]},e.ticket_id))})]}),(0,J.jsxs)(`div`,{className:`col-span-6`,children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Active Workspace`}),(0,J.jsxs)(Z,{className:`p-5`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:(0,J.jsxs)(`span`,{style:{color:`var(--accent)`},children:[`Ticket #`,c.ticket_id,` Details`]})}),(0,J.jsx)(`div`,{className:`mb-2 text-[16px] font-medium text-text`,children:c.subject}),(0,J.jsx)(`div`,{className:`mb-3 whitespace-pre-wrap rounded-[4px] border border-th-border bg-bg px-3 py-2.5 text-[13px] text-text`,children:c.body}),(0,J.jsx)(Y,{className:`mb-1.5`,children:`Context & AI Analysis`}),(0,J.jsxs)(`div`,{className:`mb-3 space-y-1 text-[12px] text-text-muted`,children:[(0,J.jsxs)(`div`,{children:[`Predicted Category: `,(0,J.jsx)(Nt,{children:c.predicted_category}),` (`,c.predicted_subcategory,`)`]}),(0,J.jsxs)(`div`,{children:[`Confidence Score: `,(0,J.jsx)(`b`,{className:`text-text tabular-nums`,children:c.confidence_score.toFixed(2)})]}),(0,J.jsxs)(`div`,{children:[`Escalation Reason: `,(0,J.jsx)(`span`,{className:`text-accent`,children:c.escalation_reason||`Manual Triage`})]}),(0,J.jsxs)(`div`,{children:[`Classifier Statement: `,(0,J.jsx)(`span`,{className:`italic text-text-subtle`,children:c.classification_reasoning||`Decided by local model`})]})]})]}),(0,J.jsxs)(`div`,{className:`mt-3`,children:[(0,J.jsx)(Y,{className:`mb-1.5`,children:`Agent Response Workspace`}),(0,J.jsx)(It,{value:l,onChange:e=>u(e.target.value),rows:7,className:`text-[12px]`}),(0,J.jsxs)(`div`,{className:`mt-3 flex items-center gap-2`,children:[(0,J.jsx)(Q,{variant:`primary`,onClick:()=>{n(c.ticket_id)},children:`Resolve Ticket`}),(0,J.jsx)(Q,{onClick:()=>{},children:`Refer to Lead`}),(0,J.jsx)(Q,{onClick:async()=>{if(!a){alert(`Please expand 'LLM Integration' in the sidebar and enter your API Key first.`);return}m(!0);let e=await Qt(c,i,a);u(e),r(c.ticket_id,{suggested_reply:e}),m(!1)},disabled:p,children:p?`Drafting...`:`✨ AI Draft`}),(0,J.jsxs)($,{value:d,onChange:e=>{let t=e.target.value;t!==`-- Choose Category --`&&(r(c.ticket_id,{predicted_category:t,escalate_to_human:!1}),f(`-- Choose Category --`))},children:[(0,J.jsx)(`option`,{children:`-- Choose Category --`}),hn.map(e=>(0,J.jsx)(`option`,{children:e},e))]})]})]})]})]})]})}function vn(){let e=S,t=e.overall_classification_metrics,n=e.escalation_metrics,r=e.per_category_metrics,{labels:i,matrix:a}=e.confusion_matrix,o=[{label:`Classification Accuracy`,value:`${(t.accuracy*100).toFixed(1)}%`},{label:`Macro F1-Score`,value:`${(t.macro_f1*100).toFixed(1)}%`},{label:`Escalation Precision`,value:`${(n.escalation_precision*100).toFixed(1)}%`},{label:`Escalation Recall`,value:`${(n.escalation_recall*100).toFixed(1)}%`}];return(0,J.jsxs)(`div`,{className:`px-8 py-6`,children:[(0,J.jsx)(X,{title:`Benchmarks & Evaluation`,subtitle:`Evaluated on ${e.sample_size} gold-labelled tickets from ${e.dataset}.`}),(0,J.jsx)(`div`,{className:`grid grid-cols-4 gap-4`,children:o.map(e=>(0,J.jsxs)(Z,{className:`px-4 py-3.5`,children:[(0,J.jsx)(`div`,{className:`eyebrow`,children:e.label}),(0,J.jsx)(`div`,{className:`mt-1 text-[26px] font-semibold leading-none text-text tabular-nums`,style:{letterSpacing:`-0.02em`},children:e.value})]},e.label))}),(0,J.jsxs)(`div`,{className:`mt-6 grid grid-cols-2 gap-6`,children:[(0,J.jsxs)(`div`,{children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Category Performance`}),(0,J.jsx)(Z,{className:`overflow-hidden`,children:(0,J.jsxs)(`table`,{className:`w-full text-[13px]`,children:[(0,J.jsx)(`thead`,{children:(0,J.jsxs)(`tr`,{className:`border-b border-th-border text-left text-text-muted`,children:[(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Category`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Precision`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Recall`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`F1`}),(0,J.jsx)(`th`,{className:`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]`,children:`Support`})]})}),(0,J.jsx)(`tbody`,{children:Object.entries(r).map(([e,t])=>(0,J.jsxs)(`tr`,{className:`border-b border-th-border/40 last:border-0 hover:bg-surface-2/40`,children:[(0,J.jsx)(`td`,{className:`px-4 py-2.5 text-text`,children:e}),(0,J.jsxs)(`td`,{className:`px-4 py-2.5 tabular-nums text-text-muted`,children:[(t.precision*100).toFixed(1),`%`]}),(0,J.jsxs)(`td`,{className:`px-4 py-2.5 tabular-nums text-text-muted`,children:[(t.recall*100).toFixed(1),`%`]}),(0,J.jsxs)(`td`,{className:`px-4 py-2.5 tabular-nums text-text`,children:[(t.f1_score*100).toFixed(1),`%`]}),(0,J.jsx)(`td`,{className:`px-4 py-2.5 tabular-nums text-text-muted`,children:t.support})]},e))})]})})]}),(0,J.jsxs)(`div`,{children:[(0,J.jsx)(Y,{className:`mb-2`,children:`Confusion Matrix`}),(0,J.jsxs)(Z,{className:`overflow-x-auto p-4`,children:[(0,J.jsxs)(`table`,{className:`text-[12px]`,children:[(0,J.jsx)(`thead`,{children:(0,J.jsxs)(`tr`,{children:[(0,J.jsx)(`th`,{className:`p-1.5`}),i.map(e=>(0,J.jsx)(`th`,{className:`p-1.5 text-[10px] font-semibold uppercase text-text-subtle`,title:e,children:e.split(` `)[0]},e))]})}),(0,J.jsx)(`tbody`,{children:a.map((e,t)=>(0,J.jsxs)(`tr`,{children:[(0,J.jsx)(`td`,{className:`p-1.5 text-[10px] font-semibold uppercase text-text-subtle`,title:i[t],children:i[t].split(` `)[0]}),e.map((e,n)=>{let r=e>0?Math.min(.9,.15+e*.18):0;return(0,J.jsx)(`td`,{className:`h-9 w-9 text-center tabular-nums`,style:{backgroundColor:t===n?`color-mix(in oklab, var(--accent) ${r*100}%, var(--surface))`:`color-mix(in oklab, var(--text-muted) ${r*60}%, var(--surface))`,color:e>0?`var(--text)`:`var(--text-subtle)`,borderRadius:4},children:e},n)})]},t))})]}),(0,J.jsx)(`div`,{className:`mt-3 flex flex-wrap gap-x-4 gap-y-1`,children:i.map(e=>(0,J.jsxs)(`span`,{className:`text-[10px] text-text-subtle`,children:[(0,J.jsx)(`b`,{className:`text-text-muted`,children:e.split(` `)[0]}),` = `,e]},e))})]})]})]}),(0,J.jsxs)(Z,{className:`mt-6 px-4 py-3 text-[12px] text-text-muted`,children:[`Additional metrics — Weighted F1: `,(0,J.jsxs)(`b`,{className:`text-text`,children:[(t.weighted_f1*100).toFixed(1),`%`]}),` · Macro Precision: `,(0,J.jsxs)(`b`,{className:`text-text`,children:[(t.macro_precision*100).toFixed(1),`%`]}),` · Macro Recall: `,(0,J.jsxs)(`b`,{className:`text-text`,children:[(t.macro_recall*100).toFixed(1),`%`]}),` · Escalation F1: `,(0,J.jsxs)(`b`,{className:`text-text`,children:[(n.escalation_f1*100).toFixed(1),`%`]}),` · Escalation Accuracy: `,(0,J.jsxs)(`b`,{className:`text-text`,children:[(n.escalation_accuracy*100).toFixed(1),`%`]})]})]})}function yn(){let[e,t]=(0,b.useState)(`Overview`),[n,r]=(0,b.useState)(ee),[i,a]=(0,b.useState)(new Set),[o,s]=(0,b.useState)(null),[c,l]=(0,b.useState)(null),[u,d]=(0,b.useState)(`Local`),[f,p]=(0,b.useState)(``),m=(0,b.useCallback)(e=>{l(e),window.setTimeout(()=>l(null),2400)},[]),h=(0,b.useCallback)(e=>{r(t=>[...t,e]),m(`${e.ticket_id} processed and added to the queue.`)},[m]),g=(0,b.useCallback)(e=>{a(t=>new Set(t).add(e)),m(`Auto-reply sent for ${e}. Ticket resolved and closed.`)},[m]),_=(0,b.useCallback)((e,t)=>{r(n=>n.map(n=>n.ticket_id===e?{...n,...t}:n)),t.predicted_category?m(`Routing updated: ${t.predicted_category}`):m(`Draft response saved.`)},[m]);return(0,b.useCallback)(e=>{s(e),t(`Support Queue`)},[]),(0,J.jsxs)(kt,{children:[(0,J.jsx)(Ot,{active:e,onNav:t,provider:u,onProvider:d,apiKey:f,onApiKey:p}),(0,J.jsxs)(`main`,{className:`h-screen flex-1 overflow-y-auto`,children:[e===`Overview`&&(0,J.jsx)(nn,{tickets:n,onAdd:h}),e===`Support Queue`&&(0,J.jsx)(cn,{tickets:n,resolved:i,onResolve:g,onUpdate:_,onAdd:h,focusId:o,provider:u,apiKey:f}),e===`Live Simulator`&&(0,J.jsx)(pn,{provider:u,apiKey:f}),e===`Agent Inbox`&&(0,J.jsx)(gn,{tickets:n,resolved:i,onResolve:g,onUpdate:_,provider:u,apiKey:f}),e===`Benchmarks`&&(0,J.jsx)(vn,{})]}),c&&(0,J.jsx)(zt,{message:c})]})}export{yn as component};