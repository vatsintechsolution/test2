'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      let currentSectionId = null;
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          currentSectionId = section.getAttribute('id');
        }
      });
      
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of use</h1>
      <p className="text-sm mb-8">Last updated: January 2019 <Link href="#version-history" className="text-blue-600 hover:underline">See previous versions</Link></p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Terms of use</h2>
        <div className="grid grid-cols-1  gap-y-2 gap-x-8">
          {[...Array(19)].map((_, i) => (
            <div key={i} className="flex">
              <button 
                onClick={() => scrollToSection(`section-${i + 1}`)}
                className={`text-left hover:underline ${activeSection === `section-${i + 1}` ? 'text-blue-600 font-medium' : ''}`}
              >
                {i + 1}. {getSectionTitle(i + 1)}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <section id="section-1">
          <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms of Use</h3>
          <p>By accessing or using this Web Site you agree to be legally bound by the Terms of Use and all terms and conditions contained or referenced herein or any additional terms and conditions set forth on this Web Site. If you do NOT agree to all of these terms, you should NOT access or use this Web Site.</p>
        </section>

        <section id="section-2">
          <h3 className="text-xl font-semibold mb-3">2. Modification of Terms</h3>
          <p>These Terms of Use may be amended by Signify at any time. Such amended Terms of Use shall be effective upon posting. By continuing to access or use the Web Site after such posting, you will be deemed to have accepted such amendments. You are advised to regularly review any applicable terms and conditions. Other Signify web sites may have their own terms of use which apply to such web sites.</p>
          <p className="mt-2">Signify reserves the right to discontinue or make changes or updates with respect to the Web Site or the Content of the Web Site at any time without notice. Signify reserves the right to restrict, refuse or terminate access of any person to the Web Site or any part thereof effective immediately without notice at any time and for any reason whatsoever at its sole discretion.</p>
        </section>

        <section id="section-3">
          <h3 className="text-xl font-semibold mb-3">3. Privacy Policy</h3>
          <p>Personal information provided or collected through or in connection with this Web Site shall only be used in accordance with Signify&apos;s Privacy Policy and these Terms of Use are subject to the Privacy Policy as posted on this Web Site.</p>
        </section>

        <section id="section-4">
          <h3 className="text-xl font-semibold mb-3">4. Disclaimers</h3>
          <p className="uppercase">ALL INFORMATION (INCLUDING, WITHOUT LIMITATION, CONTENT, TEXT, IMAGES, GRAPHICS, LINKS, AND OTHER MATERIALS) ON THE WEB SITE OR ANY ADVERTISEMENT IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;. SIGNIFY, ITS SUBSIDIARIES, AFFILIATES, PARTNERS, LICENSORS, DISTRIBUTORS AND SUPPLIERS HEREBY EXPRESSLY DISCLAIM TO EXTENT PERMITTED BY LAW ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR ANY PARTICULAR PURPOSE, NON-INFRINGEMENT, OR AS TO THE OPERATION OF THIS WEB SITE, THE CONTENT OR USER CONTENT.</p>
          <p className="mt-2">Neither Signify nor its subsidiaries, affiliates, partners, licensors, distributors and suppliers warrants or makes any representations that (i) the Web Site will meet your requirements, (ii) the Web Site will be uninterrupted, timely, secure, or error free, or (iii) the results that may be obtained from the use of the Web Site (including any Content, information and materials on this Web Site) will be correct, complete, accurate, reliable, or otherwise meet your requirements.</p>
          <p className="mt-2">Product images displayed in any advertisement or public forum are for illustrative purposes only. Actual product colors, sizes, and features may vary from those shown. No guarantees are made regarding exact appearance.</p>
          <p className="mt-2">Savings of up to 50% are based on comparisons between EcoLink BLDC 35W motor fan and a EcoLink conventional 78W induction motor fan (1200 mm sweep), assuming 16 hours of daily usage and electricity cost of ₹6/unit. Actual savings may vary by usage, electricity rates and model. While running on inverter, comparison is at 5th speed.Activate extended warranty by registering on the Digi Shield App.</p>
          <p className="mt-2">This is a public web site. You should have no expectation of confidentiality with respect to any User Content you may submit on this Web Site. Do not submit confidential information here.</p>
          <p className="mt-2">Signify and its subsidiaries, affiliates, partners, licensors, distributors and suppliers shall have no liability for interruptions or omissions in Internet, network or hosting or any third party services and do not warrant that the Web Site or the services which make this Web Site available or electronic communications sent by Signify are free from viruses or any other harmful elements.</p>
          <p className="mt-2">Any material downloaded or otherwise obtained through the use of this Web Site is done at your own discretion and risk. You will be solely responsible for any damage to your computer system or devices or loss of data that results from the download of any such material.</p>
        </section>

        <section id="section-5">
          <h3 className="text-xl font-semibold mb-3">5. Registration</h3>
          <p>Accessing certain areas of the Web Site and using certain functions or features of the Web Site may require you to register as a contributor. This registration is free of charge.</p>
          <p className="mt-2">When you register, you must choose a unique user name or &quot;handle&quot; and password and you must provide a unique, valid, current and verifiable e-mail address. Duplicate user names and e-mail addresses are not allowed, so if the name or address you enter is already in use, you will be prompted to choose another one. We will send you a confirmation e-mail with your registered information. In the event that delivery of such information fails for any reason, your access or use of areas, functions or features requiring such registration may be refused or terminated. You will promptly update your registration to keep it accurate and current. You are solely responsible for maintaining the confidentiality of your password. We reserve the right to change your username or delete your submitted content to the Web Site or refuse or cancel your registration if you choose a user name that, in our sole discretion, is obscene, indecent, abusive or otherwise improper. You are also solely responsible for restricting access to your computer(s). You agree to accept responsibility for all activities occurring under your account, user name, and/or password that are due to your conduct, inaction, or negligence. If you become aware of any suspicious or unauthorized conduct concerning your account, user name and/or password, you agree to contact us immediately by e-mail at digital.marketing.support@signify.com. We may, at our own discretion, bar registration from any specific e-mail service or ISP.</p>
        </section>

        <section id="section-6">
          <h3 className="text-xl font-semibold mb-3">6. Contributor</h3>
          <p>By submitting any User Content to the Web Site, you agree that the material will be proper, constructive and relevant and will not contain any item that may be unlawful or otherwise unfit for publication, including but not limited to items that (1) may be defamatory or injurious to another person or entity, (2) may cause harm to any person or property or otherwise defame or harass any person or organization, (3) may violate any legal rights of any person (including right to privacy or publicity), (4) are pornographic, obscene, profane, vulgar, indecent, or threatening, (5) are culturally, ethnically, or otherwise objectionable, or (6) suggest or encourage any illegal activity.</p>
          <p className="mt-2">You will use reasonable efforts to scan and remove any viruses or other contaminating or destructive features before submitting any material. You also shall not transmit chain letters, pyramid schemes, surveys and solicitations through the Web Site. You shall also not forge headers or manipulate identifies or other data in order to disguise the origin of any Content and/or User Content transmitted through our Web Site or to manipulate your presence on the Web Site. You shall not interfere with or disrupt our sites, servers or networks or take any action that imposes an unreasonably or disproportionately large load on our infrastructure.</p>
          <p className="mt-2">You affirm, represent and warrant that the User Content submitted to the Web Site does not infringe any proprietary right of any party or person, such as but not limited to copyright, trademark or patent, or any confidentiality obligation.</p>
          <p className="mt-2">You acknowledge and agree that any of your ideas, submissions or discussions or any other User Content provided by you within the Web Site that is not the subject of intellectual property right protection may be used by any other contributor without compensation or attribution.</p>
          <p className="mt-2">You hereby grant to Signify, its subsidiaries, affiliates and other partners a worldwide, perpetual, irrevocable, royalty free, non-exclusive, sub-licensable and transferable license to use, host, store, reproduce, modify, copy, prepare derivative works of, distribute, publicly perform, publicly display, transmit and publish User Content provided by you, on this Web Site or any other Signify web site or in other Signify marketing or public relations materials in any and all media at Signify&apos;s sole discretion.</p>
          <p className="mt-2">You shall be solely responsible for your own User Content and the consequences of posting submitting and/or publishing it. Signify may, but is not obligated to, review and monitor, before and/or after submitting User Content. However, you acknowledge that it is impossible for us to monitor or review all User Content. Without limitation, Signify, its subsidiaries, affiliates, partners, licensors, distributors and suppliers will not and cannot be held responsible for the accuracy, completeness, quality or validity of User Content posted by third parties.</p>
        </section>

        <section id="section-7">
          <h3 className="text-xl font-semibold mb-3">7. Limitation of Liability</h3>
          <p>TO THE EXTENT PERMITTED BY LAW, IN NO EVENT WILL SIGNIFY, ITS SUBSIDIARIES, AFFILIATES, PARTNERS, LICENSORS, DISTRIBUTORS AND SUPPLIERS BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF USE, OR LOSS OF DATA, LOST PROFITS, OR BUSINESS INTERRUPTION, HOWEVER CAUSED, ARISING OUT OF OR RELATED TO THIS WEB SITE OR THE CONTENT OR USER CONTENT, WHETHER THE CLAIM ARISES UNDER CONTRACT, TORT (INCLUDING NEGLIGENCE AND STRICT LIABILITY) OR OTHERWISE, EVEN IF SIGNIFY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
        </section>

        <section id="section-8">
          <h3 className="text-xl font-semibold mb-3">8. Third Party Content/Software</h3>
          <p>This Web Site may contain third party content and/or software. Such content and/or software is provided by third parties and not by Signify. Third party copyrights, trademarks or other intellectual property rights, and usage terms may apply to you with respect to this third party content and/or software.</p>
        </section>

        <section id="section-9">
          <h3 className="text-xl font-semibold mb-3">9. Copyright and Trademarks</h3>
          <p>This Web Site and the Content and User Content published herein, including, but not limited to, text, design, graphics, interfaces and code, and the selection and arrangement thereof, is copyrighted as a collective work and/or compilation under the United States and other copyright laws, and is the property of Signify. All trademarks featured on this Web Site are the property of their respective owners, and may not be used without permission of the owner.</p>
        </section>

        <section id="section-10">
          <h3 className="text-xl font-semibold mb-3">10. Proprietary Rights in Web Site</h3>
          <p>Your use of the Web Site does not grant to you any right, title or interest in any intellectual property on the Web Site. The Web Site and all intellectual property rights subsisting therein, including, but not limited to copyright, trademarks, names, and logos (except for User Content) are owned by Signify and/or its suppliers. You agree not to challenge or to facilitate or aid a third party to challenge the validity or ownership of Signify&apos;s intellectual property rights.</p>
        </section>

        <section id="section-11">
          <h3 className="text-xl font-semibold mb-3">11. U.S. Copyright Infringement Claims</h3>
          <p>If you know or suspect that any of the materials on this Web Site (including but not limited to materials posted on the Forum) have been used or copied in a way that constitutes copyright infringement, please send notice to Signify&apos;s designated agent identified below. According to the U.S. Digital Millennium Copyright Act, 17 U.S.C. Sec. 512(c)(3), your notice must comply with the following requirements:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>A physical or electronic signature of the copyright owner or person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
            <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site;</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material;</li>
            <li>Information reasonably sufficient to permit us to contact you, such as address, telephone number, and, if available, an electronic mail address at which you may be contacted;</li>
            <li>A statement by you that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law;</li>
            <li>A statement that the information in the notification is accurate and under penalty of perjury, that you are the copyright owner or authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          </ul>
          <p className="mt-4">The designated agent for notice of copyright infringement claims may be reached as follows:</p>
          <p className="mt-2">By Mail: Signify Netherlands B.V.<br />
          Legal Services<br />
          High Tech Campus 48<br />
          5656AE Eindhoven<br />
          The Netherlands</p>
          <p className="mt-4">The preceding information is provided exclusively for notifying Signify that your copyrighted material may have been infringed. All other inquiries, such as product related questions and requests or concerns regarding improper postings and/content, will not receive a response through this process.</p>
        </section>

        <section id="section-12">
          <h3 className="text-xl font-semibold mb-3">12. Indemnification and Release</h3>
          <p>You agree to indemnify and hold harmless Signify, its subsidiaries, affiliates, partners, distributors and suppliers and each of their respective officers, directors, employees, shareholders, legal representatives, agents, successors and assigns, from and against any damages, liabilities, costs and expenses (including reasonable attorneys&apos; and professionals&apos; fees and litigation costs) that arise out of the posting, content, or transmission of any message, data, material or any other User Content you submit on the Web Site or any violation of these Terms of Use by you. In the event of any complaint or legal action arising from any message, or any other User Content posted by you, Signify reserves the right to reveal your identity and any other information Signify may have about you.</p>
          <p className="mt-2">If you have a dispute with one or more users, you agree to indemnify, hold harmless and release Signify, its subsidiaries, affiliates, partners, distributors and suppliers, and each of their respective officers, directors, employees, shareholders, legal representatives, agents, successors and assigns from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.</p>
        </section>

        <section id="section-13">
          <h3 className="text-xl font-semibold mb-3">13. Shut-Down of Site</h3>
          <p>We have the sole right to shut down the Web Site or any part(s) thereof for any reason at any time without notice or consent. We will have no responsibility or liability for failure to store or delete any Content and/or User Content submitted to the Web Site.</p>
        </section>

        <section id="section-14">
          <h3 className="text-xl font-semibold mb-3">14. Signify Products</h3>
          <p>The Web Site may contain references to specific Signify products and services that may not be (readily) available in a particular country. Any such reference does not imply or warrant that any such products or services shall be available at any time in any particular country. Please contact your local Signify business contact for further information.</p>
        </section>

        <section id="section-15">
          <h3 className="text-xl font-semibold mb-3">15. &apos;Safe Harbor&apos; Statement under the Private Securities Litigation Reform Act of 1995</h3>
          <p>The information on this website may contain certain forward-looking statements with respect to the financial condition, results of operations and business of Signify and certain of the plans and objectives of Signify with respect to these items. We caution readers that no forward-looking statement is a guarantee of future performance and that actual results could differ materially from those contained in the forward-looking statements. Examples of forward-looking statements include the statements we have made about our strategy, estimates of sales growth, future EBITA and cost savings, future developments in our organic business as well as the benefit of future acquisitions, and our capital position. By their nature, forward-looking statements involve risk and uncertainty because they relate to future events and circumstances and there are many factors that could cause actual results and developments to differ materially from those expressed or implied by these forward-looking statements.</p>
          <p className="mt-2">The forward looking statements are subject to, among other things, domestic and global economic and business conditions, the successful implementation of our strategy, our ability to identify and complete successful acquisitions and to integrate those acquisitions into our business, consumer preferences with respect to our existing and new products, our ability to develop and market new products, our ability to realize the benefits of this strategy, the policies and actions of governmental and regulatory authorities, changes in legislation, and the impact of competition – a number of which factors are beyond our control. As a result, our actual future results may differ materially from the plans, goals, and expectations set forth in such forward-looking statements.</p>
          <p className="mt-2">Additional risks and factors are identified in our documents filed with or furnished to the U.S. Securities and Exchange Commission (the &quot;SEC&quot;) including in our most recent Annual Report on Form 20-F, which is available on the SEC&apos;s website at www.sec.gov. Any forward-looking statements made by or on our behalf speak only as of the date they are made. We do not undertake to update forward-looking statements to reflect any changes in expectations with regard thereto or any changes in events, conditions or circumstances on which any such statement is based. The reader should, however, consult any additional disclosures that we have made or may make in documents we have filed or may file with the SEC.</p>
        </section>

        <section id="section-16">
          <h3 className="text-xl font-semibold mb-3">16. Dispute Resolution</h3>
          <p>These Terms of Use shall be governed by and construed in accordance with the laws of the state of The Netherlands. You agree to the non-exclusive jurisdiction of the courts in Amsterdam, The Netherlands for any disputes, claim or cause of action arising out of, or relating to or in connection with these Terms of Use or your use of this Web Site, including any disputes relating to the existence or validity of these Terms of Use, provided that you agree to submit any such disputes, claims or causes of action exclusively to the courts of Amsterdam, The Netherlands.</p>
        </section>

        <section id="section-17">
          <h3 className="text-xl font-semibold mb-3">17. Severability</h3>
          <p>If any provision of these Terms of Use is held to be invalid or unenforceable, then the invalid or unenforceable provision will be replaced by a valid, enforceable provision that most closely matches the intent of the original provision and the remaining provisions shall be enforced.</p>
        </section>

        <section id="section-18">
          <h3 className="text-xl font-semibold mb-3">18. No Waiver</h3>
          <p>No failure on the part of Signify to enforce any part of these Terms of Use shall constitute a waiver of any of Signify&apos;s rights under these Terms of Use, whether for past or future actions on the part of any person. Neither the receipt of any funds by Signify nor the reliance of any person on Signify&apos;s actions shall be deemed to constitute a waiver of any part of these Terms of Use. Only a specific, written waiver signed by an authorized representative of Signify shall have any legal effect whatsoever.</p>
        </section>

        <section id="section-19">
          <h3 className="text-xl font-semibold mb-3">19. Headings</h3>
          <p>The headings of the sections of the Terms of Use are inserted for convenience only and shall not constitute a part hereof or affect in any way the meaning or interpretation of the Terms of Use.</p>
        </section>
      </div>

      <div className="mt-12">
        <p>Thank you for joining our Web Site.</p>
        <p className="mt-4 font-bold">Last Update: January, 2019</p>
      </div>

      <div className="mt-8 pt-8 border-t" id="version-history">
        <h3 className="text-xl font-semibold mb-4">Version history</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">Date</th>
              <th className="text-left py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4">April 2017</td>
              <td className="py-2">
                <Link target="_blank" href="https://www.signify.com/global/legal/terms-of-use/archive/terms-of-use-en-in-20190128" className="text-blue-600 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper function to get section titles
function getSectionTitle(sectionNumber: number): string {
  const titles = [
    'Acceptance of Terms of Use',
    'Modification of Terms',
    'Privacy Policy',
    'Disclaimers',
    'Registration',
    'Contributor',
    'Limitation of Liability',
    'Third Party Content/Software',
    'Copyright and Trademarks',
    'Proprietary Rights in Web Site',
    'U.S. Copyright Infringement Claims',
    'Indemnification and Release',
    'Shut-Down of Site',
    'Signify Products',
    "'Safe Harbor' Statement under the Private Securities Litigation Reform Act of 1995",
    'Dispute Resolution',
    'Severability',
    'No Waiver',
    'Headings'
  ];
  
  return titles[sectionNumber - 1];
} 