import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MatrixContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: transparent;
`;

const MatrixCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // DevOps and technical jargon matrix - shorter, readable terms
    const techMatrix = [
      // Cloud & Infrastructure
      "AWS", "GCP", "AZURE", "K8S", "DOCKER", "TERRAFORM", "ANSIBLE", "JENKINS",
      "GITHUB", "GITLAB", "CI/CD", "DEVOPS", "MICROSERVICES", "CONTAINERS", 
      "SCALING", "LOAD_BALANCER", "AUTO_SCALING", "MONITORING", "LOGGING", "METRICS",
      
      // Programming & Scripting
      "PYTHON", "BASH", "SHELL", "JS", "NODE", "REACT", "TS", "GO", "JAVA", 
      "RUBY", "PHP", "SQL", "NOSQL", "MONGODB", "REDIS", "POSTGRES",
      
      // Tools & Technologies
      "PROMETHEUS", "GRAFANA", "ELASTIC", "KIBANA", "FLUENTD", "DATADOG", 
      "SENTRY", "SONAR", "NEXUS", "HELM", "ISTIO", "VAULT", "CONSUL", "ETCD",
      
      // Infrastructure Concepts
      "IAC", "CONFIG_MGMT", "SECRETS", "DR", "BACKUP", "REPLICATION", 
      "CLUSTERING", "HA", "RESILIENCE", "OBSERVABILITY", "TELEMETRY",
      
      // Networking & Security
      "VPC", "SUBNET", "SEC_GROUPS", "VPN", "SSL", "TLS", "OIDC", "OAUTH", 
      "JWT", "API_GATEWAY", "CDN", "DNS", "FIREWALL", "WAF", "DDOS",
      
      // Data & Storage
      "S3", "EBS", "EFS", "RDS", "DYNAMODB", "REDSHIFT", "SNAPSHOT", 
      "SHARDING", "INDEXING", "CACHING",
      
      // Monitoring & Alerting
      "ALERTS", "DASHBOARDS", "SLA", "SLI", "SLO", "ERROR_RATE", "LATENCY",
      "THROUGHPUT", "UPTIME", "INCIDENT",
      
      // Development Practices
      "AGILE", "SCRUM", "KANBAN", "CODE_REVIEW", "TDD", "BDD", "CI", "CD",
      "BLUE_GREEN", "CANARY", "ROLLING_UPDATE", "ZERO_DOWNTIME", "FEATURE_FLAGS",
      
      // System Administration
      "LINUX", "UBUNTU", "CENTOS", "REDHAT", "SYSTEMD", "CRON", "SSH",
      "SSL_CERTS", "PKG_MGMT", "SERVICE_MGMT",
      
      // Modern Tech Stack
      "SERVERLESS", "LAMBDA", "EDGE_COMPUTING", "IOT", "ML", "AI", 
      "BIG_DATA", "ETL", "DATA_WAREHOUSE", "DATA_LAKE", "KAFKA", "RABBITMQ"
    ];

    const fontSize = 18;
    const columns = Math.floor(canvas.width / (fontSize * 8)); // Wider spacing for words
    const drops: Array<{y: number, text: string, speed: number}> = [];

    // Initialize drops with specific words and speeds
    for (let x = 0; x < columns; x++) {
      drops.push({
        y: Math.random() * -100,
        text: techMatrix[Math.floor(Math.random() * techMatrix.length)],
        speed: 0.2 + Math.random() * 0.3 // Random speed between 0.2 and 0.5
      });
    }

    let frameCount = 0;
    const speedControl = 2; // Update every 2 frames

    const draw = () => {
      frameCount++;
      
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = 'left';

      // Draw matrix words
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize * 8; // Wider spacing
        const y = drop.y * fontSize;

        // Add glow effect
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.fillText(drop.text, x, y);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Move drop down slowly
        if (frameCount % speedControl === 0) {
          drop.y += drop.speed;
        }

        // Reset drop when it goes off screen
        if (drop.y * fontSize > canvas.height + 50) {
          drop.y = -2;
          drop.text = techMatrix[Math.floor(Math.random() * techMatrix.length)];
          drop.speed = 0.2 + Math.random() * 0.3;
        }
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      // Recalculate columns after resize
      const newColumns = Math.floor(canvas.width / (fontSize * 8));
      while (drops.length < newColumns) {
        drops.push({
          y: Math.random() * -100,
          text: techMatrix[Math.floor(Math.random() * techMatrix.length)],
          speed: 0.2 + Math.random() * 0.3
        });
      }
      while (drops.length > newColumns) {
        drops.pop();
      }
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <MatrixContainer>
      <MatrixCanvas ref={canvasRef} />
    </MatrixContainer>
  );
};

export default MatrixBackground; 