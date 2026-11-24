type CPDomain = {
  count: number
  subdomains: string[] // parent to sub
}

type CPDomainNode = {
  domain: string
  count: number
  children: Map<string, CPDomainNode> // K: domain
}

function parseCPDomain(cpDomainStr: string): CPDomain {
  const [countStr, domainStr] = cpDomainStr.split(' ')
  return {
    count: Number(countStr),
    subdomains: domainStr!.split('.').reverse(),
  }
}

function dfs(currNode: CPDomainNode, suffixStr: string, res: string[]) {
  const currStr = (suffixStr === '' ? currNode.domain : currNode.domain + '.') + suffixStr

  if (currNode.count > 0) {
    res.push(`${currNode.count} ${currStr}`)
  }

  currNode.children.forEach((node) => dfs(node, currStr, res))
}

function subdomainVisits(cpdomains: string[]): string[] {
  const cpDomainTree: CPDomainNode = {
    domain: '',
    count: 0,
    children: new Map(),
  }

  // Populate the tree
  for (const cpDomain of cpdomains.map((str) => parseCPDomain(str))) {
    let currNode = cpDomainTree
    for (const subdomain of cpDomain.subdomains) {
      if (!currNode.children.has(subdomain)) {
        currNode.children.set(subdomain, {
          domain: subdomain,
          count: 0,
          children: new Map(),
        })
      }

      currNode = currNode.children.get(subdomain)!
      currNode.count += cpDomain.count
    }
  }

  // Walk the tree
  const res: string[] = []
  dfs(cpDomainTree, '', res)

  return res
}
