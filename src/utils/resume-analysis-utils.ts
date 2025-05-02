
// Function to generate ATS-friendly text for better parsing
export const generateATSText = (data: any): string => {
  const lines = [];
  
  // Personal information
  if (data.personal) {
    lines.push(`${data.personal.name || ''}`);
    lines.push(`${data.personal.title || ''}`);
    
    const contactInfo = [];
    if (data.personal.email) contactInfo.push(data.personal.email);
    if (data.personal.phone) contactInfo.push(data.personal.phone);
    if (data.personal.location) contactInfo.push(data.personal.location);
    if (contactInfo.length > 0) lines.push(contactInfo.join(' | '));
    
    if (data.personal.linkedin) lines.push(`LinkedIn: ${data.personal.linkedin}`);
    if (data.personal.website) lines.push(`Website: ${data.personal.website}`);
  }
  
  // Summary - strictly limited to 3 bullet points
  if (data.summary) {
    lines.push('');
    lines.push('SUMMARY');
    lines.push('-------');
    const summaryPoints = data.summary.split('\n')
      .filter((line: string) => line.trim())
      .slice(0, 3); // Strict limit to 3 bullet points
    lines.push(...summaryPoints);
  }
  
  // Experience
  if (data.experience && data.experience.length > 0) {
    lines.push('');
    lines.push('EXPERIENCE');
    lines.push('----------');
    data.experience.forEach((exp: any) => {
      lines.push(`${exp.title} | ${exp.company} | ${exp.location} | ${exp.startDate} - ${exp.endDate}`);
      if (exp.description) {
        const descPoints = exp.description.split('\n')
          .filter((line: string) => line.trim())
          .map((point: string) => point.replace(/^[-•*]\s*/, '').trim()) // Clean up bullet points
          .filter((point: string, index: number, self: string[]) => 
            // Remove duplicate or very similar points
            self.findIndex(p => p.toLowerCase().includes(point.toLowerCase().substring(0, 10))) === index
          );
        lines.push(...descPoints.map((point: string) => `- ${point}`));
      }
      lines.push('');
    });
  }
  
  // Projects
  if (data.projects && data.projects.length > 0) {
    lines.push('');
    lines.push('PROJECTS');
    lines.push('--------');
    data.projects.forEach((project: any) => {
      lines.push(`${project.title} | ${project.startDate} - ${project.endDate}`);
      if (project.technologies && project.technologies.length > 0) {
        lines.push(`Technologies: ${project.technologies.join(', ')}`);
      }
      if (project.description) {
        const descPoints = project.description.split('\n')
          .filter((line: string) => line.trim())
          .map((point: string) => point.replace(/^[-•*]\s*/, '').trim()) // Clean up bullet points
          .filter((point: string, index: number, self: string[]) => 
            // Remove duplicate or very similar points
            self.findIndex(p => p.toLowerCase().includes(point.toLowerCase().substring(0, 10))) === index
          );
        lines.push(...descPoints.map((point: string) => `- ${point}`));
      }
      if (project.link) lines.push(`Link: ${project.link}`);
      lines.push('');
    });
  }
  
  // Education
  if (data.education && data.education.length > 0) {
    lines.push('');
    lines.push('EDUCATION');
    lines.push('---------');
    data.education.forEach((edu: any) => {
      lines.push(`${edu.degree}${edu.field ? ` in ${edu.field}` : ''} | ${edu.institution} | ${edu.location} | ${edu.startDate} - ${edu.endDate}`);
      if (edu.description) {
        const descPoints = edu.description.split('\n')
          .filter((line: string) => line.trim())
          .map((point: string) => point.replace(/^[-•*]\s*/, '').trim()) // Clean up bullet points
          .filter((point: string, index: number, self: string[]) => 
            // Remove duplicate or very similar points
            self.findIndex(p => p.toLowerCase().includes(point.toLowerCase().substring(0, 10))) === index
          );
        lines.push(...descPoints.map((point: string) => `- ${point}`));
      }
      lines.push('');
    });
  }
  
  // Skills - ensure unique skills without repetition
  if (data.skills) {
    lines.push('');
    lines.push('SKILLS');
    lines.push('------');
    if (data.skills.technical && data.skills.technical.length > 0) {
      // Remove duplicate or very similar skills
      const uniqueTechnical = [...new Set(data.skills.technical)];
      lines.push(`Technical Skills: ${uniqueTechnical.join(', ')}`);
    }
    if (data.skills.soft && data.skills.soft.length > 0) {
      // Remove duplicate or very similar skills
      const uniqueSoft = [...new Set(data.skills.soft)];
      lines.push(`Soft Skills: ${uniqueSoft.join(', ')}`);
    }
  }
  
  return lines.join('\n');
};
