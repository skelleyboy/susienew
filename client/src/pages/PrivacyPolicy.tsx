import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-40 pb-20 bg-[#0f1115] text-white text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6 font-light tracking-tight">Privacy Policy</h1>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight prose-p:font-light prose-p:leading-relaxed prose-li:font-light prose-li:marker:text-primary/50">
            
            <div className="mb-16 pb-8 border-b border-gray-100">
              <p className="lead text-xl md:text-2xl font-light text-muted-foreground">
                Privacy Policy & Terms of Service: Data will not be shared with third parties for marketing or promotional purposes.
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl text-primary mb-10">PRIVACY NOTICE</h2>
            
            <div className="bg-gray-50 p-8 md:p-12 mb-16 rounded-sm border border-gray-100">
              <h3 className="mt-0 text-2xl mb-6">SUMMARY OF KEY POINTS</h3>
              <p className="mb-8">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.</p>
              
              <div className="space-y-6">
                <div>
                  <strong className="text-primary font-medium block mb-1">What personal information do we process?</strong> 
                  <span className="text-muted-foreground">When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</span>
                </div>
                
                <div>
                  <strong className="text-primary font-medium block mb-1">Do we process any sensitive personal information?</strong> 
                  <span className="text-muted-foreground">We do not process sensitive personal information.</span>
                </div>
                
                <div>
                  <strong className="text-primary font-medium block mb-1">Do we collect any information from third parties?</strong> 
                  <span className="text-muted-foreground">We do not collect any information from third parties.</span>
                </div>
                
                <div>
                  <strong className="text-primary font-medium block mb-1">How do we process your information?</strong> 
                  <span className="text-muted-foreground">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.</span>
                </div>
                
                <div>
                  <strong className="text-primary font-medium block mb-1">In what situations and with which parties do we share personal information?</strong> 
                  <span className="text-muted-foreground">We may share information in specific situations and with specific third parties.</span>
                </div>
                
                <div>
                  <strong className="text-primary font-medium block mb-1">What are your rights?</strong> 
                  <span className="text-muted-foreground">Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</span>
                </div>
                
                <div>
                  <strong className="text-primary font-medium block mb-1">How do you exercise your rights?</strong> 
                  <span className="text-muted-foreground">The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl mb-8">TABLE OF CONTENTS</h3>
            <ol className="columns-1 md:columns-2 gap-x-12 space-y-2 mb-16 text-sm md:text-base">
              <li>WHAT INFORMATION DO WE COLLECT?</li>
              <li>HOW DO WE PROCESS YOUR INFORMATION?</li>
              <li>WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</li>
              <li>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
              <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
              <li>IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</li>
              <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
              <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
              <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
              <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
              <li>DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
              <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
              <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
              <li>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
            </ol>

            <div className="space-y-16">
              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">1. WHAT INFORMATION DO WE COLLECT?</h3>
                
                <h4 className="text-xl font-medium mt-8 mb-4 text-primary">Personal information you disclose to us</h4>
                <p><strong>In Short:</strong> We collect personal information that you provide to us.</p>
                
                <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                
                <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-6">
                  <li>names</li>
                  <li>phone numbers</li>
                  <li>email addresses</li>
                  <li>mailing addresses</li>
                  <li>job titles</li>
                  <li>usernames</li>
                  <li>passwords</li>
                  <li>contact preferences</li>
                  <li>contact or authentication data</li>
                  <li>billing addresses</li>
                  <li>debit/credit card numbers</li>
                </ul>
                
                <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
                <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

                <h4 className="text-xl font-medium mt-10 mb-4 text-primary">Information automatically collected</h4>
                <p><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
                
                <p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</p>
                
                <p>The information we collect includes:</p>
                <ul className="space-y-4 my-6">
                  <li className="pl-2 border-l-2 border-primary/30"><strong>Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
                  <li className="pl-2 border-l-2 border-primary/30"><strong>Location Data.</strong> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
                <p><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                
                <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                <ul>
                  <li>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h3>
                <p className="mb-8"><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>

                <div className="bg-gray-50 p-8 rounded-sm mb-8">
                  <h4 className="text-xl font-medium mb-4 text-primary mt-0">If you are located in the EU or UK, this section applies to you.</h4>
                  <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
                  <ul className="mt-4 space-y-2">
                    <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                    <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                    <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-sm">
                  <h4 className="text-xl font-medium mb-4 text-primary mt-0">If you are located in Canada, this section applies to you.</h4>
                  <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
                  <p className="mt-4">In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                    <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                    <li>For investigations and fraud detection and prevention</li>
                    <li>For business transactions provided certain conditions are met</li>
                    <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                    <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                    <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                    <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                    <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                    <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                    <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                    <li>If the information is publicly available and is specified by the regulations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h3>
                <p><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</p>
                <p>We may need to share your personal information in the following situations:</p>
                <ul className="space-y-4 mt-6">
                  <li className="pl-2 border-l-2 border-primary/30"><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                  <li className="pl-2 border-l-2 border-primary/30"><strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
                  <li className="pl-2 border-l-2 border-primary/30"><strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h3>
                <p><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
                <p>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.</p>
                <p>To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"</p>
                
                <div className="bg-gray-50 p-6 rounded-sm mt-6">
                  <strong className="text-primary block mb-2">Google Analytics</strong>
                  <p className="m-0 text-sm">We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a>.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h3>
                <p><strong>In Short:</strong> We may transfer, store, and process your information in countries other than your own.</p>
                <p>If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
                <p><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>
                <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">8. DO WE COLLECT INFORMATION FROM MINORS?</h3>
                <p><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>
                <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">9. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
                <p><strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information.</p>
                <p>In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information.</p>
                <p className="mt-4 p-4 bg-gray-50 border-l-2 border-primary"><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
                <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
                <p><strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.</p>

                <h4 className="text-xl font-medium mt-8 mb-4 text-primary">Categories of Personal Information We Collect</h4>
                <p>We have collected the following categories of personal information in the past twelve (12) months:</p>
                
                <div className="overflow-x-auto mt-6 border border-gray-100 rounded-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-4 border-b">Category</th>
                        <th className="p-4 border-b">Examples</th>
                        <th className="p-4 border-b text-center">Collected</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-4 font-medium">A. Identifiers</td>
                        <td className="p-4 text-muted-foreground">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="p-4 font-medium text-primary">B. Personal information (California Customer Records statute)</td>
                        <td className="p-4 text-muted-foreground">Name, contact information, education, employment, employment history, and financial information</td>
                        <td className="p-4 text-center font-bold text-primary">YES</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">C. Protected classification characteristics</td>
                        <td className="p-4 text-muted-foreground">Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">D. Commercial information</td>
                        <td className="p-4 text-muted-foreground">Transaction information, purchase history, financial details, and payment information</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">E. Biometric information</td>
                        <td className="p-4 text-muted-foreground">Fingerprints and voiceprints</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">F. Internet or other network activity</td>
                        <td className="p-4 text-muted-foreground">Browsing history, search history, online behavior, interest data, and interactions with our websites</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">G. Geolocation data</td>
                        <td className="p-4 text-muted-foreground">Device location</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">H. Audio, electronic, sensory information</td>
                        <td className="p-4 text-muted-foreground">Images and audio, video or call recordings</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">I. Professional or employment-related info</td>
                        <td className="p-4 text-muted-foreground">Business contact details, job title, work history</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">J. Education Information</td>
                        <td className="p-4 text-muted-foreground">Student records and directory information</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">K. Inferences</td>
                        <td className="p-4 text-muted-foreground">Inferences drawn to create a profile or summary about preferences</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">L. Sensitive personal Information</td>
                        <td className="p-4 text-muted-foreground">-</td>
                        <td className="p-4 text-center font-bold text-gray-400">NO</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-8">We will use and retain the collected personal information as needed to provide the Services or for as long as the user has an account with us.</p>
                
                <h4 className="text-xl font-medium mt-8 mb-4 text-primary">Your Rights</h4>
                <p>You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to know whether or not we are processing your personal data</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to access your personal data</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to correct inaccuracies in your personal data</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to request the deletion of your personal data</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to obtain a copy of the personal data you previously shared with us</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to non-discrimination for exercising your rights</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>Right to opt out of the processing of your personal data if it is used for targeted advertising</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">12. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
                <p><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
                <p>If you have questions or comments about this notice, you may contact us by email at the address provided on our contact page.</p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl border-b border-primary/20 pb-4 mb-8">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h3>
                <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.</p>
              </section>
            </div>

          </div>
        </div>
      </Section>
      
      <Footer />
    </div>
  );
}