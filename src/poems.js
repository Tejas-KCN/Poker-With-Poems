/* ---- POEM TEXT ----
   Stanzas are separated by a blank line. Wrap a phrase in _underscores_ for italics.
   OPENING and CLOSING are the two poems every reader sees. Replace the placeholder text. */
const UNLOCK_AT=3; /* different hands a reader must find before the showdown opens */
const OPENING={title:'Poker with Poems',skin:'open',text:`
The lamp is low, the room is quiet,
the deck lies cut and still.
Draw five, and let the cards decide
the things you never will.

Somewhere a letter waits unopened
beside a cooling cup,
and these cards will tell you how it ends
the moment you turn them up.

A High Card faces it alone,
a Pair has company near,
Two Pair will pick the pen up,
To Three of a Kind, there is no fear.

A Straight walks every step in turn,
a Flush finds a matching heart,
a Full House fills the kitchen up,
and Four makes a fresh start.

The Straight Flush is a road laid true,
the Royal rarer still,
one in six hundred thousand draws,
and none of these you get without will.

So call it luck, or call it odds,
the dealer does not care,
yet every hand, however dealt,
will find the letter there.

Whatever you hold, the tea shall stay,
the seal sits on the page,
and After the Deal lies face down
for when you've played your stage.

Fate may deal you any hand,
but it cannot break the seal.
So turn your cards, and then the page,
and find out what is real.
`};
const CLOSING={title:'After the Deal',skin:'close',text:`
A letter lay unopened here
beside my cooling tea.
Now the cards lie spilled upon the table
and the letters have been set free.

Whoever you were when you started,
whichever hand you drew,
a pair, a house, another sequence,
a story found its way to you.

Some of us were sat beside,
some crossed a street at night,
some wrote the words they had carried,
some found a door alight.

But every road came back to this,
This poem where sits every reader's name
a trembling thumb, a first line read,
and nothing now is the same.

The cards were only the way in,
a game to loosen the letter's seal.
What mattered was reaching here,
and the courage that you didn't conceal.

For the letter was never my ink,
nor the ending, nor the drawn hand.
It was somebody saying, "I remember"
and someone else who would understand.

The clock ticks on. The lamp burns low.
The tea is long since gone,
and the quiet in this room tonight
is a resting silence that I lean upon.

So leave the lamp on in the window
and a chair pulled out for two,
for somewhere someone holds a letter
and you know what they're going through.

A letter lay unopened here
beside my cooling tea.
It only wanted someone brave,
and the someone brave was me.
`};
const POEMS={
royal:{skin:'royal',accent:'#f7c862',text:`
A letter lay unopened here
beside my cooling tea.
But the tea refused to cool tonight,
and threads of time stood still for me.

I broke the seal, and out poured {gold|gold,}
none of it anger, nor regret,
just every word I'd longed to hear,
and some I had not thought of yet.

The first line said, "I was wrong to go."
The second, "But so was I."
The third, "Hope you kept my chair in place."
The fourth, "I never wished to say goodbye."

The fifth was two words, written large,
the most beloved I could hold,
"Our Home." And I laughed and cried at once,
like something breaking out of cold.

Then came a knock, so soft, so sure,
the whole house seemed to hum.
I opened up, and in the porch light
stood the one I'd waited for to come.

No questions were asked, no debts to count,
no lines left to rehearse.
We held on, and every year apart
dissolved into this single verse.

The lamp blazed up, the kettle sang,
the cups came off their shelf,
and the two of us, so long spent alone,
sat comfortable, now laughing at ourselves.

The clock ticked on. The lamp burned bright.
The tea was warm and sweet.
Of all the hands this night could deal,
this was the one that was complete.
`},
straightflush:{skin:'straightflush',accent:'#f0b45a',text:`
A letter lay unopened here
beside my cooling tea.
So I took it up and read one line,
then another I read patiently.

One line, and I was breathing.
>Two lines, and I could stand.
>>Three lines, and I had my coat on,
>>>on the fourth I rushed out, the letter in my hand.

The fifth line gave an address
that I had known since I was small,
a porch, a gate, a window,
and a lamp that lit in the hall.

So I walked the way I hadn't walked in years,
each step further than the one before,
until the street became a straight, clear line
that now ended at a door.

I did not knock, the door swung wide
before my hand could rise.
"You came," was all they said to me,
with tears in their tired eyes.

"I did," I said. It was enough.
The rest could wait, we knew,
the kettle, and the lamp, and years
were still there for us to get through.

The clock ticked on. The lamp burned low,
though now this lamp was theirs,
and the tea was hot in a borrowed cup,
as we sat in our old comfy chairs.
`},
four:{skin:'four',accent:'#ee9f78',text:`
A letter lay unopened here
beside my cooling tea.
Like four long years of silence
had sat down next to me.

I broke the seal and read it through,
then read it one time more.
It wasn't an argument or a request,
just a knock upon my door.

The first line I wrote was "Thank you,"
for the years that were so bright.
The second, "I am sorry,"
for my share of the fight.

The third line was "I forgive you,"
which I didn't think I would say.
The fourth was "Come and see me,"
and I meant it more now than any other day.

Four short lines, and nothing more to say,
each one a debt I long owed.
I pressed the stamp down firmly
and felt the lifting of a load.

The clock ticked on. The lamp burned low.
The tea went cold, and I let it be.
Four years of silence now answered
by this page that set me free.

I left the porch light burning
and the door a little ajar,
for when the question is silence for four years long
the answer to it may not be afar.
`},
fullhouse:{skin:'fullhouse',accent:'#f2b45f',text:`
A letter lay unopened here
beside my cooling tea.
But the house today was full of footsteps
that were coming close to me.

My mother set the kettle down,
my brother pulled a chair,
my sister, with her quiet hands,
smoothed back my hair.

Three had never been away
and two had travelled oh so far
but at least they found the kitchen light
as moths would find a burning star.

I broke the seal and passed it round,
each one took a line to read.
What was too heavy for one voice
I think five voices could succeed.

Someone laughed, and someone cried,
and someone read to the end,
and two began to argue
about the reply we would send.

We wrote it awhile, we wrote it twice,
we signed it with five names,
and the page looked less like a letter
than thoughts burnt into a page.

The clock ticked on. The lamp burned low.
The tea was warm once again.
The kitchen hummed with quiet talk
of what had happened there and then.

So the lamp stays on, and the chairs stay out,
and the house is full tonight.
The sorrow still is somewhere here,
but it's sitting in good company's light.
`},
flush:{skin:'flush',accent:'#a9b8ff',text:`
A letter lay unopened here
beside my cooling tea.
The written ink across its front
just seemed oh so familiar to me.

I broke the seal, and there it was,
the very thing I had once planned to say.
"I'm sorry," said the opening line,
and how "I've missed you every day."

Each sentence matched the ones I'd drafted
and never sent away that spring,
as though we were sat in separate rooms
and mourned the damned same thing.

I laughed, and then I wept a little,
and found how they felt the same.
Two people with one long silence
and neither one there to blame.

I took my pen and wrote it plain
"I'd have sent the same to you."
It wasn't much, but it was all I had,
and all of it was all that was true.

The clock ticked on. The lamp burned low.
I sealed it with a tired sigh.
Two letters somewhere on the road
that waved at the other as they passed by.

So the tea went cold, the lamp stayed on,
but nothing now felt the same,
for the words that I'd carried a while
now held on with somebody else's name.
`},
straight:{skin:'straight',accent:'#8fd1c0',text:`
A letter lay unopened here
beside my cooling tea.
I told myself, _I will only read a line,_
and that would be enough for me.

The first line was only my name,
in the handwriting I know so well.
I read it twice, then moved on
to where the next line fell.

The second line said, _I was wrong._
The third said, _so was I._
The fourth line asked, the fifth answered,
like it knew I would wonder why.

I did not rush, though I promised
I still let each sentence land.
The anger turned to something so small
I could hold it inside my hand.

The page went on to summer porches,
to little songs we sang off key,
to all the things we never said
and all that we had let go free.

Each line was one more step I took,
each step made me a little less afraid.
I walked the whole way down the page
like a road that someone had made.

The last word was a simple one,
no grandeur or perfect part.
It only said, _I'm still your friend,_
and it may have opened up my heart.

The clock ticked on. The lamp burned low.
The tea was again cold and still.
I came in as the one who feared to write back,
and left as someone who will.
`},
three:{skin:'three',accent:'#d9a86a',text:`
A letter lay unopened here
beside my cooling tea.
I reached inside the drawer for a knife
and found so much more waiting for me.

Three bundles, tied with faded string,
all in the handwriting that I knew.
Some had stamps from years ago,
and some looked almost new.

I counted three bundles, then counted again,
my breath became quick and tight.
The years I tried to leave behind
were all gonna be awake tonight.

The first was tied in {blue|blue,}
the second tied in {gray|gloomy gray,}
the third in {red|red,} the color of
the lovely things we didn't say.

I opened one, then two, then three,
the pages spilled like pouring rain.
Old jokes, old apologies, bold confessions,
the entire story of love again.

It all came rushing in at once,
a flood I could not slow,
the summers, winters, the slammed doors,
and a beloved friend I used to know.

I should have felt sad, I think,
but something in me stirred.
Each line I had been dodging
was full of quiet, nostalgic words.

The clock ticked on. The lamp burned low.
I stacked them on my knee.
Three bundles and one new sealed letter,
and the whole beloved past sitting here with me.
`},
twopair:{skin:'twopair',accent:'#e58f98',text:`
A letter lay unopened here
beside my cooling tea.
But something in me had grown tired
of what had not seen.

I broke the seal. My hands were steady,
and that surprised me too.
The words inside were not the ones I dreaded,
but they weren't all that was true.

The handwriting I knew by heart.
It flowed like a sea across the page.
Some lines were kind, and some were sharp,
and some were just so full of rage.

So I pulled a clean sheet toward me
and picked the pen up too.
I told myself, keep what is good,
but don't mourn what you can't undo.

I kept the years when we were close,
I kept the subtle way of how you cared.
I forgave the words you said in anger
and also the days when you weren't there.

I wrote, "It hurt, and I'm still here,"
which took me half an hour.
I wrote, "I'm sorry for what I did"
and felt my heart lose its power.

It wasn't a perfect peace we made,
no tidy, happy end.
Just two tired hearts who struck a deal
that someday we might mend.

The clock ticked on. The lamp burned low.
I pressed the stamp down tight.
Not everything was mended,
but at least I could sleep tonight.
`},
pair:{skin:'pair',accent:'#f0b45a',text:`
A letter lay unopened here
beside my cooling tea.
But I am not alone tonight,
someone has sat down with me.

I never heard them come inside,
they only pulled aside a chair.
They didn't ask me what it was,
they simply sat quiet, right there.

~"I'll listen," they said gently,
~"and I won't look away."
I broke the seal with a shaking thumb
and I read what it had to say.

The first line stuck inside my throat,
my voice came out so small.
They slid the tea across to me
and didn't speak a word at all.

Out loud, the words were softer
than they were inside my head.
The anger that I dreaded
was mostly hurt, unsaid.

When I reached the final line
we sat without a word.
The clock ticked on, the lamp burned low,
and for once I felt heard.

I still don't know what I'll write back,
or if I'll write at all.
But a sorrow shared across a table
is a lighter thing to haul.

So I fold the page, and the lamp stays on,
and the tea goes cold once more.
Two chairs, two cups, one open letter,
and I left with only half the sadness I would have before.
`},
high:{skin:'high',accent:'#8d9bd6',text:`
A letter lay unopened here
beside my cooling tea.
It begs me softly, break the seal,
but I'm afraid of what I'll see.

Is it goodbye from one more friend?
Or rejection to the love I showed?
Or pages of anger, line by line,
a fury that has now overflowed?

I do not want to hear it now.
I only want to rest,
where dreams take me to wonderland
and I need not be my best.

So I leave it sealed, just as it lies,
it can wait a year or more.
I can't bear any more pain tonight,
so I'll pretend there's no letter at my door.
`}
};
