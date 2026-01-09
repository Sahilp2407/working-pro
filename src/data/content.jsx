import CodeBlock from '../components/CodeBlock';
import LinkBlock from '../components/LinkBlock';
import chatgptIcon from '../assets/icons/chatgpt.png';
import geminiIcon from '../assets/icons/gemini.png';
import midjourneyIcon from '../assets/icons/midjourney.png';

export const day1Content = [
    {
        id: "intro-basics",
        title: "1. Introduction & AI Basics",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Why This Session Exists</h3>
                <p><strong>What this session is about:</strong> Explaining what AI actually is and how to use it correctly at work.</p>
                <p><strong>Why it is needed:</strong> AI tools are already in offices, but usage without understanding leads to wrong answers, blind trust, and mistakes.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>What you should gain:</strong>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Understand how AI works (basics)</li>
                        <li>Ask AI better questions</li>
                        <li>Know when AI should NOT be used</li>
                    </ul>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Who This Session Is For</h3>
                <p>HR, Marketing, Sales, Operations, Finance, Managers, and Founders.</p>
                <p style={{ marginTop: '0.5rem' }}><em>Note: No coding, maths, or technical background required. AI is treated as a work tool.</em></p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. What Is Artificial Intelligence (AI)?</h3>
                <p><strong>Definition:</strong> Machines doing tasks that normally require human intelligence.</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li>Google Maps routes</li>
                    <li>Netflix recommendations</li>
                    <li>Face unlock</li>
                </ul>
                <p style={{ marginTop: '0.5rem' }}><strong>What AI is NOT:</strong> It does not think, feel, or look like a human. It works using patterns and data.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>D. What Is Generative AI?</h3>
                <p><strong>Definition:</strong> AI that creates new content instead of only analyzing data.</p>
                <p><strong>Can create:</strong> Text (emails), Images (posters), Code, Ideas.</p>
                <CodeBlock language="GENAI EXAMPLES" code={`ChatGPT writing an email
Canva AI creating a poster
AI suggesting content ideas`} />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>E. Traditional Software vs GenAI</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Traditional Software</th>
                                <th style={{ padding: '0.5rem' }}>Generative AI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Fixed rules</td>
                                <td style={{ padding: '0.5rem' }}>Learns from data</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Same input → Same output</td>
                                <td style={{ padding: '0.5rem' }}>Same input → Different outputs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>Key difference: Software follows rules; GenAI follows patterns.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>F. How GenAI Works (Big Picture)</h3>
                <p>User gives input (prompt) → AI processes → AI gives output.</p>
                <CodeBlock language="WORKFLOW EXAMPLE" code={`Input:
"Write an email asking for leave"

Output:
"A complete email draft"`} />
                <p style={{ marginTop: '0.5rem' }}><strong>Important truth:</strong> AI is guessing the next best word, not thinking.</p>
            </>
        )
    },
    {
        id: "how-genai-works",
        title: "2. How GenAI Works (Technical)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Machine Learning (ML)</h3>
                <p>How computers learn from examples instead of being programmed step-by-step.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                    <strong>Analogy:</strong> A child learns what a dog is by seeing many dogs. AI learns patterns by seeing many examples.
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Data → Patterns → Prediction</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li><strong>Data:</strong> Emails, Documents, Images.</li>
                    <li><strong>Patterns:</strong> Common words, sentence styles.</li>
                    <li><strong>Prediction:</strong> Predicting what comes next (e.g., email ending "Best regards").</li>
                </ul>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. Parameters / Weights</h3>
                <p>Internal numbers inside the model acting like "volume controls" or "importance sliders". They decide which patterns matter more.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>D. Neural Networks</h3>
                <p>System inspired by the human brain (Input Layer → Hidden Layers → Output Layer).</p>
                <LinkBlock
                    title="Neural Network Pipeline"
                    url="https://ml-neural-networks.vercel.app/neural-networks-explainer/"
                    color="#ef4444" // red
                />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>E. Large Language Models (LLMs)</h3>
                <p><strong>Large:</strong> Huge text data. <strong>Language:</strong> Works with text. <strong>Model:</strong> Pattern prediction system.</p>
                <p><em>Examples: ChatGPT, Gemini, Claude.</em></p>
            </>
        )
    },
    {
        id: "key-concepts",
        title: "3. Key Concepts (Tokens & Limits)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Tokens</h3>
                <p>Small pieces of text used by AI (not always full words).</p>
                <CodeBlock language="TOKENIZATION" code={`Sentence: "AI helps people work faster"
Tokens: [AI] [helps] [people] [work] [faster]`} />
                <p style={{ marginTop: '0.5rem' }}>Important because costs and limits depend on tokens.</p>
                <LinkBlock
                    title="Tokenizer & Context Window"
                    url="https://simulation-gen-ai.vercel.app/token-explainer"
                    color="#3b82f6" // blue
                />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Context Window</h3>
                <p>How much information AI can remember at one time (like short-term memory).</p>
                <p><em>Limitation: In very long conversations, AI may forget older instructions.</em></p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. Hallucinations</h3>
                <p>When AI gives a confident but incorrect answer.</p>
                <CodeBlock language="HALLUCINATION EXAMPLES" code={`- Wrong dates
- Fake references
- Incorrect facts`} />
                <p style={{ marginTop: '0.5rem', color: 'red', fontWeight: 'bold' }}>Rule: Always double-check important outputs.</p>
            </>
        )
    },
    {
        id: "capabilities",
        title: "4. Capabilities & Limitations",
        content: (
            <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. What AI Is Good At</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                            <li>Writing drafts</li>
                            <li>Rewriting content</li>
                            <li>Summarizing documents</li>
                            <li>Generating ideas</li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>B. What AI Is Bad At</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                            <li>Exact calculations</li>
                            <li>Legal decisions</li>
                            <li>Confidential data</li>
                            <li>Real-time info</li>
                        </ul>
                    </div>
                </div>
                <LinkBlock
                    title="LLMs Are Good At vs Not Good At"
                    url="https://ml-neural-networks.vercel.app/llm-workplace-guide/"
                    color="#f59e0b" // amber
                />
            </>
        )
    },
    {
        id: "prompt-engineering",
        title: "5. Prompt Engineering",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. What Is a Prompt?</h3>
                <p>A prompt is what you ask AI to do.</p>
                <LinkBlock
                    title="LLM Prompt Clarity"
                    url="https://ml-neural-networks.vercel.app/llm-prompt-clarity/"
                    color="#10b981" // emerald
                />
                <CodeBlock language="PROMPT COMPARISON" code={`Bad Prompt:
"Write email"

Good Prompt:
"Write a professional email asking my manager for 2 days leave, polite tone, short length."`} />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Prompt Engineering</h3>
                <p>Asking AI clearly and correctly. Like giving instructions to a junior employee.</p>
                <LinkBlock
                    title="Reusable Prompt Templates"
                    url="https://ml-neural-networks.vercel.app/llm-template-library/"
                    color="#FF5722" // orange
                />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. Prompt Structure (Important)</h3>
                <CodeBlock language="PROMPT FRAMEWORK" code={`1. Role: "You are an HR manager"
2. Context: "Company has 20 employees"
3. Task: "Write a job description"
4. Constraints: "Professional, short"
5. Output Format: "Email, bullet points"`} />
                <LinkBlock
                    title="Prompt Framework Builder"
                    url="https://ml-neural-networks.vercel.app/prompt-framework/"
                    color="#22c55e" // green
                />
                <LinkBlock
                    title="LLM Prompt Refiner"
                    url="https://ml-neural-networks.vercel.app/llm-prompt-refiner/"
                    color="#F48B36" // light orange
                />
            </>
        )
    },
    {
        id: "model-settings",
        title: "6. Model Settings",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Temperature</h3>
                <p>Controls creativity level.</p>
                <CodeBlock language="TEMPERATURE SETTINGS" code={`Low Temp (0.1): "Resume writing" (Serious, Factual)
High Temp (0.8): "Marketing ideas" (Creative, Expressive)`} />

                <LinkBlock
                    title="Model Settings Explained Visually"
                    url="https://ml-neural-networks.vercel.app/llm-model-settings/"
                    color="#8b5cf6" // violet
                />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Max Tokens</h3>
                <p>Controls how long the AI response can be.</p>
                <CodeBlock language="MAX TOKENS" code={`Low value → short answer
High value → long explanation`} />
            </>
        )
    },
    {
        id: "applications-tools",
        title: "7. Applications & Tools",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Industry Applications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <strong>HR:</strong> JDs, Interview Qs, Policy summaries
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <strong>Marketing:</strong> Ad copy, Content ideas, Captions
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <strong>Sales:</strong> Follow-ups, Proposals
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <strong>Operations:</strong> SOPs, Checklists, Meeting notes
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <strong>Finance:</strong> Reports, Explaining numbers
                    </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <LinkBlock
                        title="LLM Role Uses"
                        url="https://ml-neural-networks.vercel.app/llm-role-uses/"
                        color="#06b6d4" // cyan
                    />
                    <LinkBlock
                        title="AI for Operations Teams"
                        url="https://ml-neural-networks.vercel.app/llm-ops-finance-leadership/"
                        color="#14b8a6" // teal
                    />
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. AI Tools</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li><strong>Chat:</strong> ChatGPT, Gemini (Writing & Thinking)</li>
                    <li><strong>Research:</strong> Perplexity (Sources)</li>
                    <li><strong>Docs:</strong> Notion AI, Google Docs AI</li>
                </ul>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
                    <img src={chatgptIcon} alt="ChatGPT" style={{ width: '60px', height: '60px', borderRadius: '12px', opacity: 0.8 }} />
                    <img src={geminiIcon} alt="Gemini" style={{ width: '60px', height: '60px', borderRadius: '12px', opacity: 0.8 }} />
                </div>
                <LinkBlock
                    title="AI Tools: Who is best at what"
                    url="https://ml-neural-networks.vercel.app/llm-tool-landscape/"
                    color="#3b82f6" // blue
                />
            </>
        )
    },
    {
        id: "conclusion",
        title: "8. Practice & Takeaways",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Mini Practice (Hands-On)</h3>
                <CodeBlock language="HANDS ON" code={`1. Pick a real work task
2. Ask AI clearly
3. Improve the prompt
4. Compare outputs`} />
                <LinkBlock
                    title="Let’s try this for real (3 minutes)"
                    url="https://ml-neural-networks.vercel.app/llm-prompt-exercise/"
                    color="#f43f5e" // rose
                />
                <p><em>Purpose: Reduce fear, build confidence.</em></p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Final Takeaway</h3>
                <div style={{ textAlign: 'center', padding: '2rem', border: '2px solid var(--border-color)', borderRadius: '16px', marginTop: '1rem' }}>
                    <p style={{ marginBottom: '0.5rem' }}>AI is a tool, not magic.</p>
                    <p style={{ marginBottom: '0.5rem' }}>AI follows patterns, not truth.</p>
                    <p style={{ marginBottom: '1.5rem' }}>Humans remain responsible.</p>
                    <strong style={{ fontSize: '1.2rem' }}>“AI will not replace you. People who understand AI will.”</strong>
                </div>
            </>
        )
    }
];

export const day2Content = [
    {
        id: "opening-context",
        title: "1. Day 2 Opening & Context",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Applying GenAI at Work: Visuals, Bots, Agents & Career Edge</h3>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>From using AI → Designing AI-powered work</p>

                <h4 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>What You’ll Learn Today</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li>Create professional visuals using AI</li>
                    <li>Understand AI bots (Custom GPTs)</li>
                    <li>Learn what AI agents really are</li>
                    <li>See real workflows used in companies</li>
                    <li>Understand the AI Generalist role</li>
                </ul>

                <h4 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Day 2 Agenda</h4>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem' }}>
                        <li>Visual GenAI & storytelling</li>
                        <li>AI tools for images & video</li>
                        <li>Hands-on visual creation</li>
                        <li>Custom GPTs (AI bots)</li>
                        <li>Agentic AI & workflows</li>
                        <li>AI Generalist role</li>
                        <li>Q&A + next steps</li>
                    </ol>
                </div>
            </>
        )
    },
    {
        id: "why-visuals-matter",
        title: "2. Why Visuals Matter at Work",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Why Visuals Are No Longer Optional</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li>People skim before reading</li>
                    <li>Visuals improve understanding & recall</li>
                    <li>Leaders expect clarity, not long text</li>
                </ul>
                <p><strong>Used in:</strong> Presentations, LinkedIn posts, Internal communication, Marketing campaigns.</p>

                <h4 style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem' }}>Before AI vs After AI</h4>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Before</th>
                                <th style={{ padding: '0.5rem' }}>After</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Dependency on designers</td>
                                <td style={{ padding: '0.5rem' }}>Anyone can create visuals</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid 1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Slow iterations</td>
                                <td style={{ padding: '0.5rem' }}>Faster execution</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>High effort</td>
                                <td style={{ padding: '0.5rem' }}>Better communication</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Example: HR creates a hiring visual in 10 minutes.</p>
            </>
        )
    },
    {
        id: "intro-visual-genai",
        title: "3. Intro to Visual GenAI",
        content: (
            <>
                <p><strong>Definition:</strong> AI that creates images or videos from text or images.</p>

                <h4 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Modes</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li>Text → Image</li>
                    <li>Image → Image</li>
                    <li>Text → Video</li>
                </ul>

                <p><strong>Where Visual GenAI Is Used:</strong> LinkedIn creatives, Slide hero images, Event posters, Campaign banners.</p>
                <CodeBlock language="IMAGE PROMPT" code={`Example Prompt:
"Create a modern LinkedIn visual for a leadership workshop"`} />
            </>
        )
    },
    {
        id: "diffusion-intuition",
        title: "4. Diffusion Models (Intuition)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>How AI Generates Images</h3>
                <p>Starts from random noise → Gradually removes noise → Guided by prompt instructions.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Analogy:</strong> Clearing fog from a glass window.
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Why Prompts Matter for Images</h3>
                <p>Prompt controls: Style, Mood, Clarity.</p>
                <CodeBlock language="PROMPT STYLING" code={`"Flat illustration, corporate style, blue palette, minimal icons"`} />
            </>
        )
    },
    {
        id: "visual-storytelling",
        title: "5. Visual Storytelling",
        content: (
            <>
                <p><strong>Random visuals =</strong> confusion. <br /> <strong>Story-based visuals =</strong> clarity.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Simple Visual Story Framework</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <span style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '20px' }}>Hook</span> →
                    <span style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '20px' }}>Problem</span> →
                    <span style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '20px' }}>Solution</span> →
                    <span style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '20px' }}>Outcome</span>
                </div>

                <CodeBlock language="LINKEDIN POST EXAMPLE" code={`Hook: "Hiring is broken"
Problem: Too many resumes
Solution: AI screening
Outcome: Faster hiring`} />
            </>
        )
    },
    {
        id: "image-tools",
        title: "6. AI Tools Overview (Images)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Image Tool Landscape</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li><strong>DALL·E:</strong> Best for business visuals.</li>
                    <li><strong>Midjourney:</strong> High aesthetics, artistic.</li>
                    <li><strong>Stable Diffusion:</strong> Customizability.</li>
                    <li><strong>Canva AI:</strong> Templates & team collaboration.</li>
                </ul>
                <p style={{ fontWeight: 600 }}>Rule: Choose tool based on outcome, not hype.</p>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '2rem' }}>
                    <img src={midjourneyIcon} alt="Midjourney" style={{ width: '60px', height: '60px', borderRadius: '12px', opacity: 0.8 }} />
                </div>
            </>
        )
    },
    {
        id: "video-tools",
        title: "7. AI Tools Overview (Video)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Video Generation Tools</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li>Runway</li>
                    <li>Pika</li>
                    <li>Canva Video AI</li>
                </ul>
                <p><strong>Common Use-Cases:</strong> Static poster → animated reel, Text → explainer video, Presentation → short video.</p>
            </>
        )
    },
    {
        id: "hands-on-visual",
        title: "8. Hands-On Visual Creation",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Instructions</h3>
                <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li>Pick a real work use-case</li>
                    <li>Write a structured prompt</li>
                    <li>Generate and refine output</li>
                </ol>
                <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <strong>Time-Bound:</strong> 3–5 minutes.
                </div>
                <p><strong>Before vs After:</strong> Weak prompt → average output; Clear prompt → professional output.</p>
            </>
        )
    },
    {
        id: "custom-gpts",
        title: "9. Custom GPTs (AI Bots)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>What is a Custom GPT?</h3>
                <p>AI with fixed role and instructions.</p>
                <CodeBlock language="COMPARISON" code={`General chat: Generic help
Custom GPT: Specialist help (e.g., "HR Policy Assistant")`} />
                <p><strong>Examples:</strong> HR policy assistant, Marketing copy assistant, Sales follow-up assistant.</p>
            </>
        )
    },
    {
        id: "gpt-components",
        title: "10. Components of a Custom GPT",
        content: (
            <>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li><strong>Instructions:</strong> Role & behavior.</li>
                    <li><strong>Knowledge:</strong> Documents, PDFs.</li>
                    <li><strong>Tools/Actions:</strong> Web browsing, logic.</li>
                    <li><strong>Guardrails:</strong> What it must NOT do (prevent incorrect advice).</li>
                </ul>
                <p><em>Example: Sales GPT refuses to promise discounts.</em></p>
            </>
        )
    },
    {
        id: "gpt-prompt-structure",
        title: "11. Prompt Structure for Custom GPTs",
        content: (
            <>
                <p>Role definition → Tone and style → Allowed tasks → Boundaries → Output format.</p>
                <CodeBlock language="GPT INSTRUCTION" code={`"You are an HR assistant. Always ask for missing details. Never guess policy information."`} />
            </>
        )
    },
    {
        id: "agentic-ai",
        title: "12. Agentic AI",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>What is an AI Agent?</h3>
                <p>AI that can <strong>Sense → Think → Act</strong>.</p>

                <h4 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Prompt vs Agent</h4>
                <CodeBlock language="PROMPT VS AGENT" code={`Prompt: One response (Answering a question)
Agent: Multi-step workflow (Intern following a checklist)`} />
            </>
        )
    },
    {
        id: "agent-workflow",
        title: "13. Agent Workflow Example",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Simple Agent Flow</h3>
                <CodeBlock language="AUTOMATION FLOW" code={`1. New row added in Google Sheet
↓
2. AI summarizes information
↓
3. Sends summary to Slack or Email`} />
                <p style={{ marginTop: '1rem' }}><strong>Tool mention:</strong> make.com (logic-focused, not technical).</p>
            </>
        )
    },
    {
        id: "ai-generalist",
        title: "14. AI Generalist Role",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>The “AI Person” Inside a Team</h3>
                <p><strong>Key Skills:</strong> Prompting, Visual AI, Custom GPTs, Agents & Workflows.</p>

                <h4 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Executive AI Generalist</h4>
                <p>Focus on: Business impact, ROI, Risk management.</p>

                <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <strong>Outcome:</strong> Higher visibility, More influence, Career acceleration.
                </div>
            </>
        )
    },
    {
        id: "day2-qa-soft-pitch",
        title: "15 & 16. Q&A and Next Steps",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Q&A Discussion</h3>
                <p>Tool selection, Privacy, Career impact, Company adoption.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Today vs Next 12 Weeks</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li><strong>Today:</strong> Awareness & Confidence</li>
                    <li><strong>12 Weeks:</strong> Real Capability & Leadership</li>
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <LinkBlock
                        title="Ask Me Anything: AI @ Work"
                        url="https://ml-neural-networks.vercel.app/llm-ama-qa/"
                        color="#8b5cf6" // violet
                    />
                    <LinkBlock
                        title="Today vs The Next 12 Weeks"
                        url="https://ml-neural-networks.vercel.app/llm-skill-journey/"
                        color="#F48B36" // light orange
                    />
                </div>

                <h4 style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Program Structure</h4>
                <p>Foundations → Tools → Hands-on projects → Agents & automation.</p>

                <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '16px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Final Closing Line</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                        “Understanding AI is good.<br />
                        Applying AI is powerful.<br />
                        Leading with AI changes careers.”
                    </p>
                </div>
            </>
        )
    }
];
